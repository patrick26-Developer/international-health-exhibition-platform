// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getSession } from '@/lib/auth/session';
import { creerSuccessResponse, creerErrorResponse } from '@/lib/types';
import { validateFile } from '@/lib/utils/validators';
import { LIMITS } from '@/lib/utils/constants';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        creerErrorResponse('Non autorisé', 'UNAUTHORIZED'),
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string || 'document';

    if (!file) {
      return NextResponse.json(
        creerErrorResponse('Aucun fichier fourni', 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Validation du fichier
    let allowedTypes: readonly string[];
    switch (type) {
      case 'image':
        allowedTypes = LIMITS.FILE.ALLOWED_IMAGE_TYPES;
        break;
      case 'video':
        allowedTypes = LIMITS.FILE.ALLOWED_VIDEO_TYPES;
        break;
      case 'document':
        allowedTypes = LIMITS.FILE.ALLOWED_DOCUMENT_TYPES;
        break;
      default:
        allowedTypes = [
          ...LIMITS.FILE.ALLOWED_IMAGE_TYPES,
          ...LIMITS.FILE.ALLOWED_DOCUMENT_TYPES,
          ...LIMITS.FILE.ALLOWED_VIDEO_TYPES,
        ];
    }

    const validationError = validateFile(file, {
      maxSize: LIMITS.FILE.MAX_SIZE_BYTES,
      allowedTypes,
    });

    if (validationError) {
      return NextResponse.json(
        creerErrorResponse(validationError.message, 'VALIDATION_ERROR'),
        { status: 400 }
      );
    }

    // Créer un nom de fichier unique
    const fileExtension = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    
    // Déterminer le répertoire de destination
    const uploadDir = join(process.cwd(), 'public', 'uploads', type);
    
    // Créer le répertoire s'il n'existe pas
    await mkdir(uploadDir, { recursive: true });

    // Lire le fichier
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Écrire le fichier
    const filePath = join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Créer l'URL publique
    const publicUrl = `/uploads/${type}/${fileName}`;

    return NextResponse.json(
      creerSuccessResponse({
        url: publicUrl,
        filename: fileName,
        originalName: file.name,
        mimetype: file.type,
        size: file.size,
        uploadedAt: new Date(),
      })
    );
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      creerErrorResponse('Erreur lors de l\'upload du fichier', 'INTERNAL_ERROR'),
      { status: 500 }
    );
  }
}