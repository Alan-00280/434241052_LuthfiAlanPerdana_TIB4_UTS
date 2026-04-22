import { supabase } from "./supabase.js";

export async function uploadAttachments({
	files,
	userId,
	ticketId,
}: {
	files: File[];
	userId: string;
	ticketId: string;
}) {
	const uploadedFiles: any[] = [];

	for (const file of files) {
		if (file.size > 6 * 1024 * 1024) {
			throw new Error("File max 6MB");
		}

		const fileExt = file.name.split(".").pop();
		const fileName = `${crypto.randomUUID()}.${fileExt}`;

		const filePath = `${userId}/${ticketId}/${fileName}`;

		const buffer = Buffer.from(await file.arrayBuffer());

		const { error } = await supabase.storage
			.from("tickets")
			.upload(filePath, buffer, {
				contentType: file.type || "application/octet-stream",
			});

		if (error) {
			throw new Error(error.message);
		}

		uploadedFiles.push({
			ticketId,
			fileName: file.name,
			fileUrl: filePath,
			fileSize: file.size,
			mimeType: file.type || "application/octet-stream",
			source: "UPLOAD",
		});
	}

	return uploadedFiles;
}
