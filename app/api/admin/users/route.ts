// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { isAdmin, isSuperAdmin } from '@/lib/utils/helpers';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '20'));
    const search = searchParams.get('search');
    const typeUtilisateur = searchParams.get('typeUtilisateur');
    const statutCompte = searchParams.get('statutCompte');
    const emailVerifie = searchParams.get('emailVerifie');
    
    const skip = (page - 1) * limit;

    const where: any = {};
    
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { prenom: { contains: search, mode: 'insensitive' } },
        { nom: { contains: search, mode: 'insensitive' } },
        { organisation: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (typeUtilisateur) {
      where.typeUtilisateur = typeUtilisateur;
    }

    if (statutCompte) {
      where.statutCompte = statutCompte;
    }

    if (emailVerifie !== null) {
      where.emailVerifie = emailVerifie === 'true';
    }

    // Les super admins voient tout, les admins normaux ne voient pas les super admins
    if (!isSuperAdmin(session.typeUtilisateur)) {
      where.typeUtilisateur = { not: 'SUPER_ADMIN' };
    }

    const [utilisateurs, total] = await Promise.all([
      prisma.utilisateur.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          prenom: true,
          nom: true,
          typeUtilisateur: true,
          statutCompte: true,
          emailVerifie: true,
          dateCreation: true,
          derniereConnexion: true,
          _count: {
            select: {
              inscriptions: true,
              exposants: true,
              benevoles: true
            }
          }
        },
        orderBy: { dateCreation: 'desc' }
      }),
      prisma.utilisateur.count({ where })
    ]);

    return NextResponse.json(
      creerSuccessResponse({
        items: utilisateurs,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      })
    );
  } catch (error) {
    console.error('Erreur récupération utilisateurs admin:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session || !isSuperAdmin(session.typeUtilisateur)) {
      return NextResponse.json(
        creerErrorResponse('Accès non autorisé', 'FORBIDDEN'),
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validation basique
    if (!body.email || !body.prenom || !body.nom) {
      return NextResponse.json(
        creerErrorResponse('Email, prénom et nom sont requis', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email: body.email }
    });

    if (existingUser) {
      return NextResponse.json(
        creerErrorResponse('Un utilisateur avec cet email existe déjà', 'CONFLICT'),
        { status: 409 }
      );
    }

    // Hasher le mot de passe par défaut (doit être changé à la première connexion)
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('Password123!', 12);

    const utilisateur = await prisma.utilisateur.create({
      data: {
        email: body.email,
        motDePasse: hashedPassword,
        prenom: body.prenom,
        nom: body.nom,
        typeUtilisateur: body.typeUtilisateur || 'VISITEUR',
        statutCompte: body.statutCompte || 'ACTIF',
        emailVerifie: body.emailVerifie || false,
        telephone: body.telephone,
        pays: body.pays,
        ville: body.ville,
        langue: body.langue || 'fr'
      },
      select: {
        id: true,
        email: true,
        prenom: true,
        nom: true,
        typeUtilisateur: true,
        statutCompte: true,
        emailVerifie: true,
        dateCreation: true
      }
    });

    // Journalisation
    await prisma.journalAudit.create({
      data: {
        utilisateurId: session.sub,
        action: 'CREATION',
        entite: 'Utilisateur',
        entiteId: utilisateur.id,
        adresseIP: request.headers.get('x-forwarded-for') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    });

    // TODO: Envoyer un email de bienvenue avec lien de réinitialisation de mot de passe

    return NextResponse.json(
      creerSuccessResponse(utilisateur, 'Utilisateur créé avec succès'),
      { status: 201 }
    );
  } catch (error) {
    console.error('Erreur création utilisateur:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur interne du serveur', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}