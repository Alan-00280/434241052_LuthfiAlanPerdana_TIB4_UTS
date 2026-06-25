import { z } from "zod";
import type { Prisma } from "../../src/generated/prisma/client.js";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	"ReadUncommitted",
	"ReadCommitted",
	"RepeatableRead",
	"Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
	"id",
	"supabaseUid",
	"username",
	"email",
	"passwordHash",
	"role",
	"fullName",
	"avatarUrl",
	"phone",
	"isActive",
	"createdAt",
	"updatedAt",
	"lastLoginAt",
]);

export const TechSupportScalarFieldEnumSchema = z.enum([
	"id",
	"userId",
	"createdAt",
	"updatedAt",
	"speciality",
]);

export const PasswordResetTokenScalarFieldEnumSchema = z.enum([
	"id",
	"token",
	"userId",
	"expiresAt",
	"usedAt",
	"createdAt",
]);

export const TicketCategoryScalarFieldEnumSchema = z.enum([
	"id",
	"name",
	"description",
	"createdAt",
]);

export const TicketScalarFieldEnumSchema = z.enum([
	"id",
	"title",
	"description",
	"status",
	"priority",
	"createdAt",
	"updatedAt",
	"resolvedAt",
	"closedAt",
	"creatorId",
	"assigneeId",
	"categoryId",
	"techSupportId",
]);

export const AttachmentScalarFieldEnumSchema = z.enum([
	"id",
	"ticketId",
	"fileName",
	"fileUrl",
	"fileSize",
	"mimeType",
	"source",
	"uploadedAt",
]);

export const TicketCommentScalarFieldEnumSchema = z.enum([
	"id",
	"ticketId",
	"authorId",
	"body",
	"createdAt",
	"updatedAt",
]);

export const TicketHistoryScalarFieldEnumSchema = z.enum([
	"id",
	"ticketId",
	"changedById",
	"field",
	"oldValue",
	"newValue",
	"note",
	"createdAt",
]);

export const NotificationScalarFieldEnumSchema = z.enum([
	"id",
	"userId",
	"ticketId",
	"type",
	"title",
	"body",
	"isRead",
	"readAt",
	"createdAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const UserRoleSchema = z.enum([
	"USER",
	"HELPDESK",
	"ADMIN",
	"TECHSUPPORT",
]);

export type UserRoleType = `${z.infer<typeof UserRoleSchema>}`;

export const TicketStatusSchema = z.enum([
	"OPEN",
	"IN_PROGRESS",
	"PENDING",
	"RESOLVED",
	"CLOSED",
]);

export type TicketStatusType = `${z.infer<typeof TicketStatusSchema>}`;

export const TechSupportSpecialtySchema = z.enum([
	"NETWORK",
	"HARDWARE",
	"SOFTWARE",
	"ACCOUNT_AUTH",
	"INFRASTRUCTURE",
]);

export type TechSupportSpecialtyType =
	`${z.infer<typeof TechSupportSpecialtySchema>}`;

export const TicketPrioritySchema = z.enum([
	"LOW",
	"MEDIUM",
	"HIGH",
	"CRITICAL",
]);

export type TicketPriorityType = `${z.infer<typeof TicketPrioritySchema>}`;

export const NotificationTypeSchema = z.enum([
	"TICKET_CREATED",
	"TICKET_ASSIGNED",
	"TICKET_STATUS_UPDATED",
	"TICKET_COMMENT_ADDED",
	"TICKET_RESOLVED",
	"TICKET_CLOSED",
]);

export type NotificationTypeType = `${z.infer<typeof NotificationTypeSchema>}`;

export const AttachmentSourceSchema = z.enum(["UPLOAD", "CAMERA"]);

export type AttachmentSourceType = `${z.infer<typeof AttachmentSourceSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	role: UserRoleSchema,
	id: z.uuid(),
	supabaseUid: z.string().nullable(),
	username: z.string(),
	email: z.string(),
	passwordHash: z.string(),
	fullName: z.string(),
	avatarUrl: z.string().nullable(),
	phone: z.string().nullable(),
	isActive: z.boolean(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	lastLoginAt: z.coerce.date().nullable(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// TECH SUPPORT SCHEMA
/////////////////////////////////////////

export const TechSupportSchema = z.object({
	speciality: TechSupportSpecialtySchema,
	id: z.uuid(),
	userId: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type TechSupport = z.infer<typeof TechSupportSchema>;

/////////////////////////////////////////
// PASSWORD RESET TOKEN SCHEMA
/////////////////////////////////////////

export const PasswordResetTokenSchema = z.object({
	id: z.uuid(),
	token: z.string(),
	userId: z.string(),
	expiresAt: z.coerce.date(),
	usedAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
});

export type PasswordResetToken = z.infer<typeof PasswordResetTokenSchema>;

/////////////////////////////////////////
// TICKET CATEGORY SCHEMA
/////////////////////////////////////////

export const TicketCategorySchema = z.object({
	id: z.uuid(),
	name: z.string(),
	description: z.string().nullable(),
	createdAt: z.coerce.date(),
});

export type TicketCategory = z.infer<typeof TicketCategorySchema>;

/////////////////////////////////////////
// TICKET SCHEMA
/////////////////////////////////////////

export const TicketSchema = z.object({
	status: TicketStatusSchema,
	priority: TicketPrioritySchema,
	id: z.uuid(),
	title: z.string(),
	description: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
	resolvedAt: z.coerce.date().nullable(),
	closedAt: z.coerce.date().nullable(),
	creatorId: z.string(),
	assigneeId: z.string().nullable(),
	categoryId: z.string().nullable(),
	techSupportId: z.string().nullable(),
});

export type Ticket = z.infer<typeof TicketSchema>;

/////////////////////////////////////////
// ATTACHMENT SCHEMA
/////////////////////////////////////////

export const AttachmentSchema = z.object({
	source: AttachmentSourceSchema,
	id: z.uuid(),
	ticketId: z.string(),
	fileName: z.string(),
	fileUrl: z.string(),
	fileSize: z.number().int(),
	mimeType: z.string(),
	uploadedAt: z.coerce.date(),
});

export type Attachment = z.infer<typeof AttachmentSchema>;

/////////////////////////////////////////
// TICKET COMMENT SCHEMA
/////////////////////////////////////////

export const TicketCommentSchema = z.object({
	id: z.uuid(),
	ticketId: z.string(),
	authorId: z.string(),
	body: z.string(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type TicketComment = z.infer<typeof TicketCommentSchema>;

/////////////////////////////////////////
// TICKET HISTORY SCHEMA
/////////////////////////////////////////

export const TicketHistorySchema = z.object({
	id: z.uuid(),
	ticketId: z.string(),
	changedById: z.string(),
	field: z.string(),
	oldValue: z.string().nullable(),
	newValue: z.string().nullable(),
	note: z.string().nullable(),
	createdAt: z.coerce.date(),
});

export type TicketHistory = z.infer<typeof TicketHistorySchema>;

/////////////////////////////////////////
// NOTIFICATION SCHEMA
/////////////////////////////////////////

export const NotificationSchema = z.object({
	type: NotificationTypeSchema,
	id: z.uuid(),
	userId: z.string(),
	ticketId: z.string().nullable(),
	title: z.string(),
	body: z.string(),
	isRead: z.boolean(),
	readAt: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
});

export type Notification = z.infer<typeof NotificationSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
	.object({
		passwordResetTokens: z
			.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManyArgsSchema)])
			.optional(),
		ticketsCreated: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		ticketsAssignedTo: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		comments: z
			.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)])
			.optional(),
		ticketHistories: z
			.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)])
			.optional(),
		notifications: z
			.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)])
			.optional(),
		techSupports: z
			.union([z.boolean(), z.lazy(() => TechSupportFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
	.object({
		select: z.lazy(() => UserSelectSchema).optional(),
		include: z.lazy(() => UserIncludeSchema).optional(),
	})
	.strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
	z
		.object({
			passwordResetTokens: z.boolean().optional(),
			ticketsCreated: z.boolean().optional(),
			ticketsAssignedTo: z.boolean().optional(),
			comments: z.boolean().optional(),
			ticketHistories: z.boolean().optional(),
			notifications: z.boolean().optional(),
			techSupports: z.boolean().optional(),
		})
		.strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
	.object({
		id: z.boolean().optional(),
		supabaseUid: z.boolean().optional(),
		username: z.boolean().optional(),
		email: z.boolean().optional(),
		passwordHash: z.boolean().optional(),
		role: z.boolean().optional(),
		fullName: z.boolean().optional(),
		avatarUrl: z.boolean().optional(),
		phone: z.boolean().optional(),
		isActive: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		lastLoginAt: z.boolean().optional(),
		passwordResetTokens: z
			.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManyArgsSchema)])
			.optional(),
		ticketsCreated: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		ticketsAssignedTo: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		comments: z
			.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)])
			.optional(),
		ticketHistories: z
			.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)])
			.optional(),
		notifications: z
			.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)])
			.optional(),
		techSupports: z
			.union([z.boolean(), z.lazy(() => TechSupportFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// TECH SUPPORT
//------------------------------------------------------

export const TechSupportIncludeSchema: z.ZodType<Prisma.TechSupportInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		tickets: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => TechSupportCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const TechSupportArgsSchema: z.ZodType<Prisma.TechSupportDefaultArgs> = z
	.object({
		select: z.lazy(() => TechSupportSelectSchema).optional(),
		include: z.lazy(() => TechSupportIncludeSchema).optional(),
	})
	.strict();

export const TechSupportCountOutputTypeArgsSchema: z.ZodType<Prisma.TechSupportCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TechSupportCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const TechSupportCountOutputTypeSelectSchema: z.ZodType<Prisma.TechSupportCountOutputTypeSelect> =
	z
		.object({
			tickets: z.boolean().optional(),
		})
		.strict();

export const TechSupportSelectSchema: z.ZodType<Prisma.TechSupportSelect> = z
	.object({
		id: z.boolean().optional(),
		userId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		speciality: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		tickets: z
			.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => TechSupportCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// PASSWORD RESET TOKEN
//------------------------------------------------------

export const PasswordResetTokenIncludeSchema: z.ZodType<Prisma.PasswordResetTokenInclude> =
	z
		.object({
			user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		})
		.strict();

export const PasswordResetTokenArgsSchema: z.ZodType<Prisma.PasswordResetTokenDefaultArgs> =
	z
		.object({
			select: z.lazy(() => PasswordResetTokenSelectSchema).optional(),
			include: z.lazy(() => PasswordResetTokenIncludeSchema).optional(),
		})
		.strict();

export const PasswordResetTokenSelectSchema: z.ZodType<Prisma.PasswordResetTokenSelect> =
	z
		.object({
			id: z.boolean().optional(),
			token: z.boolean().optional(),
			userId: z.boolean().optional(),
			expiresAt: z.boolean().optional(),
			usedAt: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		})
		.strict();

// TICKET CATEGORY
//------------------------------------------------------

export const TicketCategoryIncludeSchema: z.ZodType<Prisma.TicketCategoryInclude> =
	z
		.object({
			tickets: z
				.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
				.optional(),
			_count: z
				.union([
					z.boolean(),
					z.lazy(() => TicketCategoryCountOutputTypeArgsSchema),
				])
				.optional(),
		})
		.strict();

export const TicketCategoryArgsSchema: z.ZodType<Prisma.TicketCategoryDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TicketCategorySelectSchema).optional(),
			include: z.lazy(() => TicketCategoryIncludeSchema).optional(),
		})
		.strict();

export const TicketCategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.TicketCategoryCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TicketCategoryCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const TicketCategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.TicketCategoryCountOutputTypeSelect> =
	z
		.object({
			tickets: z.boolean().optional(),
		})
		.strict();

export const TicketCategorySelectSchema: z.ZodType<Prisma.TicketCategorySelect> =
	z
		.object({
			id: z.boolean().optional(),
			name: z.boolean().optional(),
			description: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			tickets: z
				.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
				.optional(),
			_count: z
				.union([
					z.boolean(),
					z.lazy(() => TicketCategoryCountOutputTypeArgsSchema),
				])
				.optional(),
		})
		.strict();

// TICKET
//------------------------------------------------------

export const TicketIncludeSchema: z.ZodType<Prisma.TicketInclude> = z
	.object({
		creator: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		assignee: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		category: z
			.union([z.boolean(), z.lazy(() => TicketCategoryArgsSchema)])
			.optional(),
		attachments: z
			.union([z.boolean(), z.lazy(() => AttachmentFindManyArgsSchema)])
			.optional(),
		comments: z
			.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)])
			.optional(),
		histories: z
			.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)])
			.optional(),
		notifications: z
			.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)])
			.optional(),
		techSupport: z
			.union([z.boolean(), z.lazy(() => TechSupportArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => TicketCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

export const TicketArgsSchema: z.ZodType<Prisma.TicketDefaultArgs> = z
	.object({
		select: z.lazy(() => TicketSelectSchema).optional(),
		include: z.lazy(() => TicketIncludeSchema).optional(),
	})
	.strict();

export const TicketCountOutputTypeArgsSchema: z.ZodType<Prisma.TicketCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TicketCountOutputTypeSelectSchema).nullish(),
		})
		.strict();

export const TicketCountOutputTypeSelectSchema: z.ZodType<Prisma.TicketCountOutputTypeSelect> =
	z
		.object({
			attachments: z.boolean().optional(),
			comments: z.boolean().optional(),
			histories: z.boolean().optional(),
			notifications: z.boolean().optional(),
		})
		.strict();

export const TicketSelectSchema: z.ZodType<Prisma.TicketSelect> = z
	.object({
		id: z.boolean().optional(),
		title: z.boolean().optional(),
		description: z.boolean().optional(),
		status: z.boolean().optional(),
		priority: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		updatedAt: z.boolean().optional(),
		resolvedAt: z.boolean().optional(),
		closedAt: z.boolean().optional(),
		creatorId: z.boolean().optional(),
		assigneeId: z.boolean().optional(),
		categoryId: z.boolean().optional(),
		techSupportId: z.boolean().optional(),
		creator: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		assignee: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		category: z
			.union([z.boolean(), z.lazy(() => TicketCategoryArgsSchema)])
			.optional(),
		attachments: z
			.union([z.boolean(), z.lazy(() => AttachmentFindManyArgsSchema)])
			.optional(),
		comments: z
			.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)])
			.optional(),
		histories: z
			.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)])
			.optional(),
		notifications: z
			.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)])
			.optional(),
		techSupport: z
			.union([z.boolean(), z.lazy(() => TechSupportArgsSchema)])
			.optional(),
		_count: z
			.union([z.boolean(), z.lazy(() => TicketCountOutputTypeArgsSchema)])
			.optional(),
	})
	.strict();

// ATTACHMENT
//------------------------------------------------------

export const AttachmentIncludeSchema: z.ZodType<Prisma.AttachmentInclude> = z
	.object({
		ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
	})
	.strict();

export const AttachmentArgsSchema: z.ZodType<Prisma.AttachmentDefaultArgs> = z
	.object({
		select: z.lazy(() => AttachmentSelectSchema).optional(),
		include: z.lazy(() => AttachmentIncludeSchema).optional(),
	})
	.strict();

export const AttachmentSelectSchema: z.ZodType<Prisma.AttachmentSelect> = z
	.object({
		id: z.boolean().optional(),
		ticketId: z.boolean().optional(),
		fileName: z.boolean().optional(),
		fileUrl: z.boolean().optional(),
		fileSize: z.boolean().optional(),
		mimeType: z.boolean().optional(),
		source: z.boolean().optional(),
		uploadedAt: z.boolean().optional(),
		ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
	})
	.strict();

// TICKET COMMENT
//------------------------------------------------------

export const TicketCommentIncludeSchema: z.ZodType<Prisma.TicketCommentInclude> =
	z
		.object({
			ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
			author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		})
		.strict();

export const TicketCommentArgsSchema: z.ZodType<Prisma.TicketCommentDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TicketCommentSelectSchema).optional(),
			include: z.lazy(() => TicketCommentIncludeSchema).optional(),
		})
		.strict();

export const TicketCommentSelectSchema: z.ZodType<Prisma.TicketCommentSelect> =
	z
		.object({
			id: z.boolean().optional(),
			ticketId: z.boolean().optional(),
			authorId: z.boolean().optional(),
			body: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			updatedAt: z.boolean().optional(),
			ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
			author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		})
		.strict();

// TICKET HISTORY
//------------------------------------------------------

export const TicketHistoryIncludeSchema: z.ZodType<Prisma.TicketHistoryInclude> =
	z
		.object({
			ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
			changedBy: z
				.union([z.boolean(), z.lazy(() => UserArgsSchema)])
				.optional(),
		})
		.strict();

export const TicketHistoryArgsSchema: z.ZodType<Prisma.TicketHistoryDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TicketHistorySelectSchema).optional(),
			include: z.lazy(() => TicketHistoryIncludeSchema).optional(),
		})
		.strict();

export const TicketHistorySelectSchema: z.ZodType<Prisma.TicketHistorySelect> =
	z
		.object({
			id: z.boolean().optional(),
			ticketId: z.boolean().optional(),
			changedById: z.boolean().optional(),
			field: z.boolean().optional(),
			oldValue: z.boolean().optional(),
			newValue: z.boolean().optional(),
			note: z.boolean().optional(),
			createdAt: z.boolean().optional(),
			ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
			changedBy: z
				.union([z.boolean(), z.lazy(() => UserArgsSchema)])
				.optional(),
		})
		.strict();

// NOTIFICATION
//------------------------------------------------------

export const NotificationIncludeSchema: z.ZodType<Prisma.NotificationInclude> =
	z
		.object({
			user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
			ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
		})
		.strict();

export const NotificationArgsSchema: z.ZodType<Prisma.NotificationDefaultArgs> =
	z
		.object({
			select: z.lazy(() => NotificationSelectSchema).optional(),
			include: z.lazy(() => NotificationIncludeSchema).optional(),
		})
		.strict();

export const NotificationSelectSchema: z.ZodType<Prisma.NotificationSelect> = z
	.object({
		id: z.boolean().optional(),
		userId: z.boolean().optional(),
		ticketId: z.boolean().optional(),
		type: z.boolean().optional(),
		title: z.boolean().optional(),
		body: z.boolean().optional(),
		isRead: z.boolean().optional(),
		readAt: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
	})
	.strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => UserWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => UserWhereInputSchema),
				z.lazy(() => UserWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		supabaseUid: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		username: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		passwordHash: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		role: z
			.union([
				z.lazy(() => EnumUserRoleFilterSchema),
				z.lazy(() => UserRoleSchema),
			])
			.optional(),
		fullName: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		avatarUrl: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		phone: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		lastLoginAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenListRelationFilterSchema)
			.optional(),
		ticketsCreated: z.lazy(() => TicketListRelationFilterSchema).optional(),
		ticketsAssignedTo: z.lazy(() => TicketListRelationFilterSchema).optional(),
		comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryListRelationFilterSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationListRelationFilterSchema)
			.optional(),
		techSupports: z.lazy(() => TechSupportListRelationFilterSchema).optional(),
	});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		supabaseUid: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		username: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		passwordHash: z.lazy(() => SortOrderSchema).optional(),
		role: z.lazy(() => SortOrderSchema).optional(),
		fullName: z.lazy(() => SortOrderSchema).optional(),
		avatarUrl: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		phone: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		isActive: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		lastLoginAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenOrderByRelationAggregateInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketOrderByRelationAggregateInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketOrderByRelationAggregateInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentOrderByRelationAggregateInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryOrderByRelationAggregateInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationOrderByRelationAggregateInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportOrderByRelationAggregateInputSchema)
			.optional(),
	});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.uuid(),
				supabaseUid: z.string(),
				username: z.string(),
				email: z.string(),
			}),
			z.object({
				id: z.uuid(),
				supabaseUid: z.string(),
				username: z.string(),
			}),
			z.object({
				id: z.uuid(),
				supabaseUid: z.string(),
				email: z.string(),
			}),
			z.object({
				id: z.uuid(),
				supabaseUid: z.string(),
			}),
			z.object({
				id: z.uuid(),
				username: z.string(),
				email: z.string(),
			}),
			z.object({
				id: z.uuid(),
				username: z.string(),
			}),
			z.object({
				id: z.uuid(),
				email: z.string(),
			}),
			z.object({
				id: z.uuid(),
			}),
			z.object({
				supabaseUid: z.string(),
				username: z.string(),
				email: z.string(),
			}),
			z.object({
				supabaseUid: z.string(),
				username: z.string(),
			}),
			z.object({
				supabaseUid: z.string(),
				email: z.string(),
			}),
			z.object({
				supabaseUid: z.string(),
			}),
			z.object({
				username: z.string(),
				email: z.string(),
			}),
			z.object({
				username: z.string(),
			}),
			z.object({
				email: z.string(),
			}),
		])
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				supabaseUid: z.string().optional(),
				username: z.string().optional(),
				email: z.string().optional(),
				AND: z
					.union([
						z.lazy(() => UserWhereInputSchema),
						z.lazy(() => UserWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => UserWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => UserWhereInputSchema),
						z.lazy(() => UserWhereInputSchema).array(),
					])
					.optional(),
				passwordHash: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				role: z
					.union([
						z.lazy(() => EnumUserRoleFilterSchema),
						z.lazy(() => UserRoleSchema),
					])
					.optional(),
				fullName: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				avatarUrl: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				phone: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				isActive: z
					.union([z.lazy(() => BoolFilterSchema), z.boolean()])
					.optional(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				updatedAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				lastLoginAt: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				passwordResetTokens: z
					.lazy(() => PasswordResetTokenListRelationFilterSchema)
					.optional(),
				ticketsCreated: z.lazy(() => TicketListRelationFilterSchema).optional(),
				ticketsAssignedTo: z
					.lazy(() => TicketListRelationFilterSchema)
					.optional(),
				comments: z
					.lazy(() => TicketCommentListRelationFilterSchema)
					.optional(),
				ticketHistories: z
					.lazy(() => TicketHistoryListRelationFilterSchema)
					.optional(),
				notifications: z
					.lazy(() => NotificationListRelationFilterSchema)
					.optional(),
				techSupports: z
					.lazy(() => TechSupportListRelationFilterSchema)
					.optional(),
			}),
		);

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		supabaseUid: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		username: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		passwordHash: z.lazy(() => SortOrderSchema).optional(),
		role: z.lazy(() => SortOrderSchema).optional(),
		fullName: z.lazy(() => SortOrderSchema).optional(),
		avatarUrl: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		phone: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		isActive: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		lastLoginAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		_count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
		_max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
	});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => UserScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
				z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		supabaseUid: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		email: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		passwordHash: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		role: z
			.union([
				z.lazy(() => EnumUserRoleWithAggregatesFilterSchema),
				z.lazy(() => UserRoleSchema),
			])
			.optional(),
		fullName: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		avatarUrl: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
			.optional(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		updatedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional()
			.nullable(),
	});

export const TechSupportWhereInputSchema: z.ZodType<Prisma.TechSupportWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TechSupportWhereInputSchema),
				z.lazy(() => TechSupportWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TechSupportWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TechSupportWhereInputSchema),
				z.lazy(() => TechSupportWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => EnumTechSupportSpecialtyFilterSchema),
				z.lazy(() => TechSupportSpecialtySchema),
			])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
		tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
	});

export const TechSupportOrderByWithRelationInputSchema: z.ZodType<Prisma.TechSupportOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		speciality: z.lazy(() => SortOrderSchema).optional(),
		user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
	});

export const TechSupportWhereUniqueInputSchema: z.ZodType<Prisma.TechSupportWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.uuid(),
				userId: z.string(),
			}),
			z.object({
				id: z.uuid(),
			}),
			z.object({
				userId: z.string(),
			}),
		])
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				userId: z.string().optional(),
				AND: z
					.union([
						z.lazy(() => TechSupportWhereInputSchema),
						z.lazy(() => TechSupportWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => TechSupportWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TechSupportWhereInputSchema),
						z.lazy(() => TechSupportWhereInputSchema).array(),
					])
					.optional(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				updatedAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				speciality: z
					.union([
						z.lazy(() => EnumTechSupportSpecialtyFilterSchema),
						z.lazy(() => TechSupportSpecialtySchema),
					])
					.optional(),
				user: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
				tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
			}),
		);

export const TechSupportOrderByWithAggregationInputSchema: z.ZodType<Prisma.TechSupportOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		speciality: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => TechSupportCountOrderByAggregateInputSchema)
			.optional(),
		_max: z.lazy(() => TechSupportMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => TechSupportMinOrderByAggregateInputSchema).optional(),
	});

export const TechSupportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TechSupportScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		updatedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => EnumTechSupportSpecialtyWithAggregatesFilterSchema),
				z.lazy(() => TechSupportSpecialtySchema),
			])
			.optional(),
	});

export const PasswordResetTokenWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => PasswordResetTokenWhereInputSchema),
				z.lazy(() => PasswordResetTokenWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordResetTokenWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PasswordResetTokenWhereInputSchema),
				z.lazy(() => PasswordResetTokenWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		expiresAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		usedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		token: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		expiresAt: z.lazy(() => SortOrderSchema).optional(),
		usedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
	});

export const PasswordResetTokenWhereUniqueInputSchema: z.ZodType<Prisma.PasswordResetTokenWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.uuid(),
				token: z.string(),
			}),
			z.object({
				id: z.uuid(),
			}),
			z.object({
				token: z.string(),
			}),
		])
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				token: z.string().optional(),
				AND: z
					.union([
						z.lazy(() => PasswordResetTokenWhereInputSchema),
						z.lazy(() => PasswordResetTokenWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => PasswordResetTokenWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => PasswordResetTokenWhereInputSchema),
						z.lazy(() => PasswordResetTokenWhereInputSchema).array(),
					])
					.optional(),
				userId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				expiresAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				usedAt: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				user: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
			}),
		);

export const PasswordResetTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		token: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		expiresAt: z.lazy(() => SortOrderSchema).optional(),
		usedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => PasswordResetTokenCountOrderByAggregateInputSchema)
			.optional(),
		_max: z
			.lazy(() => PasswordResetTokenMaxOrderByAggregateInputSchema)
			.optional(),
		_min: z
			.lazy(() => PasswordResetTokenMinOrderByAggregateInputSchema)
			.optional(),
	});

export const PasswordResetTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),
				z
					.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema)
					.array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema),
				z
					.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema)
					.array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		token: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		expiresAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		usedAt: z
			.union([
				z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const TicketCategoryWhereInputSchema: z.ZodType<Prisma.TicketCategoryWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketCategoryWhereInputSchema),
				z.lazy(() => TicketCategoryWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketCategoryWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketCategoryWhereInputSchema),
				z.lazy(() => TicketCategoryWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		description: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
	});

export const TicketCategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketCategoryOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		description: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
	});

export const TicketCategoryWhereUniqueInputSchema: z.ZodType<Prisma.TicketCategoryWhereUniqueInput> =
	z
		.union([
			z.object({
				id: z.uuid(),
				name: z.string(),
			}),
			z.object({
				id: z.uuid(),
			}),
			z.object({
				name: z.string(),
			}),
		])
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				name: z.string().optional(),
				AND: z
					.union([
						z.lazy(() => TicketCategoryWhereInputSchema),
						z.lazy(() => TicketCategoryWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => TicketCategoryWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TicketCategoryWhereInputSchema),
						z.lazy(() => TicketCategoryWhereInputSchema).array(),
					])
					.optional(),
				description: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
			}),
		);

export const TicketCategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketCategoryOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		description: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => TicketCategoryCountOrderByAggregateInputSchema)
			.optional(),
		_max: z.lazy(() => TicketCategoryMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => TicketCategoryMinOrderByAggregateInputSchema).optional(),
	});

export const TicketCategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketCategoryScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema),
				z
					.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema)
					.array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema),
				z
					.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema)
					.array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		name: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		description: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const TicketWhereInputSchema: z.ZodType<Prisma.TicketWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketWhereInputSchema),
				z.lazy(() => TicketWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketWhereInputSchema),
				z.lazy(() => TicketWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		description: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		status: z
			.union([
				z.lazy(() => EnumTicketStatusFilterSchema),
				z.lazy(() => TicketStatusSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => EnumTicketPriorityFilterSchema),
				z.lazy(() => TicketPrioritySchema),
			])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		resolvedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		closedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		assigneeId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		categoryId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		techSupportId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		creator: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
		assignee: z
			.union([
				z.lazy(() => UserNullableScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional()
			.nullable(),
		category: z
			.union([
				z.lazy(() => TicketCategoryNullableScalarRelationFilterSchema),
				z.lazy(() => TicketCategoryWhereInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z.lazy(() => AttachmentListRelationFilterSchema).optional(),
		comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
		histories: z.lazy(() => TicketHistoryListRelationFilterSchema).optional(),
		notifications: z
			.lazy(() => NotificationListRelationFilterSchema)
			.optional(),
		techSupport: z
			.union([
				z.lazy(() => TechSupportNullableScalarRelationFilterSchema),
				z.lazy(() => TechSupportWhereInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TicketOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		status: z.lazy(() => SortOrderSchema).optional(),
		priority: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		resolvedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		closedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		creatorId: z.lazy(() => SortOrderSchema).optional(),
		assigneeId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		categoryId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		techSupportId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		assignee: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		category: z
			.lazy(() => TicketCategoryOrderByWithRelationInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentOrderByRelationAggregateInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentOrderByRelationAggregateInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryOrderByRelationAggregateInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationOrderByRelationAggregateInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportOrderByWithRelationInputSchema)
			.optional(),
	});

export const TicketWhereUniqueInputSchema: z.ZodType<Prisma.TicketWhereUniqueInput> =
	z
		.object({
			id: z.uuid(),
		})
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				AND: z
					.union([
						z.lazy(() => TicketWhereInputSchema),
						z.lazy(() => TicketWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => TicketWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TicketWhereInputSchema),
						z.lazy(() => TicketWhereInputSchema).array(),
					])
					.optional(),
				title: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				description: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				status: z
					.union([
						z.lazy(() => EnumTicketStatusFilterSchema),
						z.lazy(() => TicketStatusSchema),
					])
					.optional(),
				priority: z
					.union([
						z.lazy(() => EnumTicketPriorityFilterSchema),
						z.lazy(() => TicketPrioritySchema),
					])
					.optional(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				updatedAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				resolvedAt: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				closedAt: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				creatorId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				assigneeId: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				categoryId: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				techSupportId: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				creator: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
				assignee: z
					.union([
						z.lazy(() => UserNullableScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional()
					.nullable(),
				category: z
					.union([
						z.lazy(() => TicketCategoryNullableScalarRelationFilterSchema),
						z.lazy(() => TicketCategoryWhereInputSchema),
					])
					.optional()
					.nullable(),
				attachments: z
					.lazy(() => AttachmentListRelationFilterSchema)
					.optional(),
				comments: z
					.lazy(() => TicketCommentListRelationFilterSchema)
					.optional(),
				histories: z
					.lazy(() => TicketHistoryListRelationFilterSchema)
					.optional(),
				notifications: z
					.lazy(() => NotificationListRelationFilterSchema)
					.optional(),
				techSupport: z
					.union([
						z.lazy(() => TechSupportNullableScalarRelationFilterSchema),
						z.lazy(() => TechSupportWhereInputSchema),
					])
					.optional()
					.nullable(),
			}),
		);

export const TicketOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		status: z.lazy(() => SortOrderSchema).optional(),
		priority: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		resolvedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		closedAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		creatorId: z.lazy(() => SortOrderSchema).optional(),
		assigneeId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		categoryId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		techSupportId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		_count: z.lazy(() => TicketCountOrderByAggregateInputSchema).optional(),
		_max: z.lazy(() => TicketMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => TicketMinOrderByAggregateInputSchema).optional(),
	});

export const TicketScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		title: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		description: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		status: z
			.union([
				z.lazy(() => EnumTicketStatusWithAggregatesFilterSchema),
				z.lazy(() => TicketStatusSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => EnumTicketPriorityWithAggregatesFilterSchema),
				z.lazy(() => TicketPrioritySchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		updatedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		assigneeId: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
	});

export const AttachmentWhereInputSchema: z.ZodType<Prisma.AttachmentWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => AttachmentWhereInputSchema),
				z.lazy(() => AttachmentWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AttachmentWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AttachmentWhereInputSchema),
				z.lazy(() => AttachmentWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		fileName: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		fileSize: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		mimeType: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		source: z
			.union([
				z.lazy(() => EnumAttachmentSourceFilterSchema),
				z.lazy(() => AttachmentSourceSchema),
			])
			.optional(),
		uploadedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		ticket: z
			.union([
				z.lazy(() => TicketScalarRelationFilterSchema),
				z.lazy(() => TicketWhereInputSchema),
			])
			.optional(),
	});

export const AttachmentOrderByWithRelationInputSchema: z.ZodType<Prisma.AttachmentOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		fileName: z.lazy(() => SortOrderSchema).optional(),
		fileUrl: z.lazy(() => SortOrderSchema).optional(),
		fileSize: z.lazy(() => SortOrderSchema).optional(),
		mimeType: z.lazy(() => SortOrderSchema).optional(),
		source: z.lazy(() => SortOrderSchema).optional(),
		uploadedAt: z.lazy(() => SortOrderSchema).optional(),
		ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
	});

export const AttachmentWhereUniqueInputSchema: z.ZodType<Prisma.AttachmentWhereUniqueInput> =
	z
		.object({
			id: z.uuid(),
		})
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				AND: z
					.union([
						z.lazy(() => AttachmentWhereInputSchema),
						z.lazy(() => AttachmentWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => AttachmentWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => AttachmentWhereInputSchema),
						z.lazy(() => AttachmentWhereInputSchema).array(),
					])
					.optional(),
				ticketId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				fileName: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				fileUrl: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				fileSize: z
					.union([z.lazy(() => IntFilterSchema), z.number().int()])
					.optional(),
				mimeType: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				source: z
					.union([
						z.lazy(() => EnumAttachmentSourceFilterSchema),
						z.lazy(() => AttachmentSourceSchema),
					])
					.optional(),
				uploadedAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				ticket: z
					.union([
						z.lazy(() => TicketScalarRelationFilterSchema),
						z.lazy(() => TicketWhereInputSchema),
					])
					.optional(),
			}),
		);

export const AttachmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.AttachmentOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		fileName: z.lazy(() => SortOrderSchema).optional(),
		fileUrl: z.lazy(() => SortOrderSchema).optional(),
		fileSize: z.lazy(() => SortOrderSchema).optional(),
		mimeType: z.lazy(() => SortOrderSchema).optional(),
		source: z.lazy(() => SortOrderSchema).optional(),
		uploadedAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z.lazy(() => AttachmentCountOrderByAggregateInputSchema).optional(),
		_avg: z.lazy(() => AttachmentAvgOrderByAggregateInputSchema).optional(),
		_max: z.lazy(() => AttachmentMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => AttachmentMinOrderByAggregateInputSchema).optional(),
		_sum: z.lazy(() => AttachmentSumOrderByAggregateInputSchema).optional(),
	});

export const AttachmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AttachmentScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema),
				z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema),
				z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		ticketId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		fileName: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		fileUrl: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		fileSize: z
			.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
			.optional(),
		mimeType: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		source: z
			.union([
				z.lazy(() => EnumAttachmentSourceWithAggregatesFilterSchema),
				z.lazy(() => AttachmentSourceSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const TicketCommentWhereInputSchema: z.ZodType<Prisma.TicketCommentWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketCommentWhereInputSchema),
				z.lazy(() => TicketCommentWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketCommentWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketCommentWhereInputSchema),
				z.lazy(() => TicketCommentWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		authorId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		ticket: z
			.union([
				z.lazy(() => TicketScalarRelationFilterSchema),
				z.lazy(() => TicketWhereInputSchema),
			])
			.optional(),
		author: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	});

export const TicketCommentOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketCommentOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		authorId: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
		author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
	});

export const TicketCommentWhereUniqueInputSchema: z.ZodType<Prisma.TicketCommentWhereUniqueInput> =
	z
		.object({
			id: z.uuid(),
		})
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				AND: z
					.union([
						z.lazy(() => TicketCommentWhereInputSchema),
						z.lazy(() => TicketCommentWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => TicketCommentWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TicketCommentWhereInputSchema),
						z.lazy(() => TicketCommentWhereInputSchema).array(),
					])
					.optional(),
				ticketId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				authorId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				body: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				updatedAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				ticket: z
					.union([
						z.lazy(() => TicketScalarRelationFilterSchema),
						z.lazy(() => TicketWhereInputSchema),
					])
					.optional(),
				author: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
			}),
		);

export const TicketCommentOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketCommentOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		authorId: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => TicketCommentCountOrderByAggregateInputSchema)
			.optional(),
		_max: z.lazy(() => TicketCommentMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => TicketCommentMinOrderByAggregateInputSchema).optional(),
	});

export const TicketCommentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketCommentScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		ticketId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		authorId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		body: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
		updatedAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const TicketHistoryWhereInputSchema: z.ZodType<Prisma.TicketHistoryWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketHistoryWhereInputSchema),
				z.lazy(() => TicketHistoryWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketHistoryWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketHistoryWhereInputSchema),
				z.lazy(() => TicketHistoryWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		changedById: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		field: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		oldValue: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		newValue: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		note: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		ticket: z
			.union([
				z.lazy(() => TicketScalarRelationFilterSchema),
				z.lazy(() => TicketWhereInputSchema),
			])
			.optional(),
		changedBy: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
	});

export const TicketHistoryOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketHistoryOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		changedById: z.lazy(() => SortOrderSchema).optional(),
		field: z.lazy(() => SortOrderSchema).optional(),
		oldValue: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		newValue: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		note: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
		changedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
	});

export const TicketHistoryWhereUniqueInputSchema: z.ZodType<Prisma.TicketHistoryWhereUniqueInput> =
	z
		.object({
			id: z.uuid(),
		})
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				AND: z
					.union([
						z.lazy(() => TicketHistoryWhereInputSchema),
						z.lazy(() => TicketHistoryWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => TicketHistoryWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TicketHistoryWhereInputSchema),
						z.lazy(() => TicketHistoryWhereInputSchema).array(),
					])
					.optional(),
				ticketId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				changedById: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				field: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				oldValue: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				newValue: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				note: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				ticket: z
					.union([
						z.lazy(() => TicketScalarRelationFilterSchema),
						z.lazy(() => TicketWhereInputSchema),
					])
					.optional(),
				changedBy: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
			}),
		);

export const TicketHistoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketHistoryOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		changedById: z.lazy(() => SortOrderSchema).optional(),
		field: z.lazy(() => SortOrderSchema).optional(),
		oldValue: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		newValue: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		note: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => TicketHistoryCountOrderByAggregateInputSchema)
			.optional(),
		_max: z.lazy(() => TicketHistoryMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => TicketHistoryMinOrderByAggregateInputSchema).optional(),
	});

export const TicketHistoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketHistoryScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema),
				z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		ticketId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		changedById: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		field: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		oldValue: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const NotificationWhereInputSchema: z.ZodType<Prisma.NotificationWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => NotificationWhereInputSchema),
				z.lazy(() => NotificationWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => NotificationWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => NotificationWhereInputSchema),
				z.lazy(() => NotificationWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => EnumNotificationTypeFilterSchema),
				z.lazy(() => NotificationTypeSchema),
			])
			.optional(),
		title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		isRead: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
		readAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		user: z
			.union([
				z.lazy(() => UserScalarRelationFilterSchema),
				z.lazy(() => UserWhereInputSchema),
			])
			.optional(),
		ticket: z
			.union([
				z.lazy(() => TicketNullableScalarRelationFilterSchema),
				z.lazy(() => TicketWhereInputSchema),
			])
			.optional()
			.nullable(),
	});

export const NotificationOrderByWithRelationInputSchema: z.ZodType<Prisma.NotificationOrderByWithRelationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		type: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		isRead: z.lazy(() => SortOrderSchema).optional(),
		readAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
		ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
	});

export const NotificationWhereUniqueInputSchema: z.ZodType<Prisma.NotificationWhereUniqueInput> =
	z
		.object({
			id: z.uuid(),
		})
		.and(
			z.strictObject({
				id: z.uuid().optional(),
				AND: z
					.union([
						z.lazy(() => NotificationWhereInputSchema),
						z.lazy(() => NotificationWhereInputSchema).array(),
					])
					.optional(),
				OR: z
					.lazy(() => NotificationWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => NotificationWhereInputSchema),
						z.lazy(() => NotificationWhereInputSchema).array(),
					])
					.optional(),
				userId: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				ticketId: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				type: z
					.union([
						z.lazy(() => EnumNotificationTypeFilterSchema),
						z.lazy(() => NotificationTypeSchema),
					])
					.optional(),
				title: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				body: z
					.union([z.lazy(() => StringFilterSchema), z.string()])
					.optional(),
				isRead: z
					.union([z.lazy(() => BoolFilterSchema), z.boolean()])
					.optional(),
				readAt: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				createdAt: z
					.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
					.optional(),
				user: z
					.union([
						z.lazy(() => UserScalarRelationFilterSchema),
						z.lazy(() => UserWhereInputSchema),
					])
					.optional(),
				ticket: z
					.union([
						z.lazy(() => TicketNullableScalarRelationFilterSchema),
						z.lazy(() => TicketWhereInputSchema),
					])
					.optional()
					.nullable(),
			}),
		);

export const NotificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.NotificationOrderByWithAggregationInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		type: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		isRead: z.lazy(() => SortOrderSchema).optional(),
		readAt: z
			.union([
				z.lazy(() => SortOrderSchema),
				z.lazy(() => SortOrderInputSchema),
			])
			.optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		_count: z
			.lazy(() => NotificationCountOrderByAggregateInputSchema)
			.optional(),
		_max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
		_min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional(),
	});

export const NotificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.NotificationScalarWhereWithAggregatesInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),
				z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => NotificationScalarWhereWithAggregatesInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema),
				z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array(),
			])
			.optional(),
		id: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		userId: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		ticketId: z
			.union([
				z.lazy(() => StringNullableWithAggregatesFilterSchema),
				z.string(),
			])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => EnumNotificationTypeWithAggregatesFilterSchema),
				z.lazy(() => NotificationTypeSchema),
			])
			.optional(),
		title: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		body: z
			.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
			.optional(),
		isRead: z
			.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
			.optional(),
		readAt: z
			.union([
				z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.lazy(() => DateTimeWithAggregatesFilterSchema),
				z.coerce.date(),
			])
			.optional(),
	});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
	});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TechSupportCreateInputSchema: z.ZodType<Prisma.TechSupportCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutTechSupportsInputSchema),
		tickets: z
			.lazy(() => TicketCreateNestedManyWithoutTechSupportInputSchema)
			.optional(),
	});

export const TechSupportUncheckedCreateInputSchema: z.ZodType<Prisma.TechSupportUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
		tickets: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema)
			.optional(),
	});

export const TechSupportUpdateInputSchema: z.ZodType<Prisma.TechSupportUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema)
			.optional(),
		tickets: z
			.lazy(() => TicketUpdateManyWithoutTechSupportNestedInputSchema)
			.optional(),
	});

export const TechSupportUncheckedUpdateInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tickets: z
			.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema)
			.optional(),
	});

export const TechSupportCreateManyInputSchema: z.ZodType<Prisma.TechSupportCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
	});

export const TechSupportUpdateManyMutationInputSchema: z.ZodType<Prisma.TechSupportUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TechSupportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		user: z.lazy(
			() => UserCreateNestedOneWithoutPasswordResetTokensInputSchema,
		),
	});

export const PasswordResetTokenUncheckedCreateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		userId: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const PasswordResetTokenUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(
				() => UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputSchema,
			)
			.optional(),
	});

export const PasswordResetTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenCreateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		userId: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const PasswordResetTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCategoryCreateInputSchema: z.ZodType<Prisma.TicketCategoryCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		description: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		tickets: z
			.lazy(() => TicketCreateNestedManyWithoutCategoryInputSchema)
			.optional(),
	});

export const TicketCategoryUncheckedCreateInputSchema: z.ZodType<Prisma.TicketCategoryUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		description: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		tickets: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCategoryInputSchema)
			.optional(),
	});

export const TicketCategoryUpdateInputSchema: z.ZodType<Prisma.TicketCategoryUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tickets: z
			.lazy(() => TicketUpdateManyWithoutCategoryNestedInputSchema)
			.optional(),
	});

export const TicketCategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketCategoryUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tickets: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCategoryNestedInputSchema)
			.optional(),
	});

export const TicketCategoryCreateManyInputSchema: z.ZodType<Prisma.TicketCategoryCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		description: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketCategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketCategoryUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketCategoryUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCreateInputSchema: z.ZodType<Prisma.TicketCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateInputSchema: z.ZodType<Prisma.TicketUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketUpdateInputSchema: z.ZodType<Prisma.TicketUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketCreateManyInputSchema: z.ZodType<Prisma.TicketCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
	});

export const TicketUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TicketUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const AttachmentCreateInputSchema: z.ZodType<Prisma.AttachmentCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
		ticket: z.lazy(() => TicketCreateNestedOneWithoutAttachmentsInputSchema),
	});

export const AttachmentUncheckedCreateInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
	});

export const AttachmentUpdateInputSchema: z.ZodType<Prisma.AttachmentUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneRequiredWithoutAttachmentsNestedInputSchema)
			.optional(),
	});

export const AttachmentUncheckedUpdateInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const AttachmentCreateManyInputSchema: z.ZodType<Prisma.AttachmentCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
	});

export const AttachmentUpdateManyMutationInputSchema: z.ZodType<Prisma.AttachmentUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const AttachmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentCreateInputSchema: z.ZodType<Prisma.TicketCommentCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		ticket: z.lazy(() => TicketCreateNestedOneWithoutCommentsInputSchema),
		author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
	});

export const TicketCommentUncheckedCreateInputSchema: z.ZodType<Prisma.TicketCommentUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		authorId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketCommentUpdateInputSchema: z.ZodType<Prisma.TicketCommentUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneRequiredWithoutCommentsNestedInputSchema)
			.optional(),
		author: z
			.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema)
			.optional(),
	});

export const TicketCommentUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		authorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentCreateManyInputSchema: z.ZodType<Prisma.TicketCommentCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		authorId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketCommentUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketCommentUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		authorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryCreateInputSchema: z.ZodType<Prisma.TicketHistoryCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		ticket: z.lazy(() => TicketCreateNestedOneWithoutHistoriesInputSchema),
		changedBy: z.lazy(
			() => UserCreateNestedOneWithoutTicketHistoriesInputSchema,
		),
	});

export const TicketHistoryUncheckedCreateInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		changedById: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketHistoryUpdateInputSchema: z.ZodType<Prisma.TicketHistoryUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema)
			.optional(),
		changedBy: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema)
			.optional(),
	});

export const TicketHistoryUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		changedById: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryCreateManyInputSchema: z.ZodType<Prisma.TicketHistoryCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		changedById: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketHistoryUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketHistoryUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		changedById: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationCreateInputSchema: z.ZodType<Prisma.NotificationCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
		ticket: z
			.lazy(() => TicketCreateNestedOneWithoutNotificationsInputSchema)
			.optional(),
	});

export const NotificationUncheckedCreateInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		ticketId: z.string().optional().nullable(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationUpdateInputSchema: z.ZodType<Prisma.NotificationUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema)
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneWithoutNotificationsNestedInputSchema)
			.optional(),
	});

export const NotificationUncheckedUpdateInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationCreateManyInputSchema: z.ZodType<Prisma.NotificationCreateManyInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		ticketId: z.string().optional().nullable(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationUpdateManyMutationInputSchema: z.ZodType<Prisma.NotificationUpdateManyMutationInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
	z.strictObject({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
			.optional()
			.nullable(),
	});

export const EnumUserRoleFilterSchema: z.ZodType<Prisma.EnumUserRoleFilter> =
	z.strictObject({
		equals: z.lazy(() => UserRoleSchema).optional(),
		in: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => NestedEnumUserRoleFilterSchema),
			])
			.optional(),
	});

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
	equals: z.boolean().optional(),
	not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
	z.strictObject({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
			.optional(),
	});

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
	z.strictObject({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeNullableFilterSchema),
			])
			.optional()
			.nullable(),
	});

export const PasswordResetTokenListRelationFilterSchema: z.ZodType<Prisma.PasswordResetTokenListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
		some: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
		none: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
	});

export const TicketListRelationFilterSchema: z.ZodType<Prisma.TicketListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => TicketWhereInputSchema).optional(),
		some: z.lazy(() => TicketWhereInputSchema).optional(),
		none: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const TicketCommentListRelationFilterSchema: z.ZodType<Prisma.TicketCommentListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => TicketCommentWhereInputSchema).optional(),
		some: z.lazy(() => TicketCommentWhereInputSchema).optional(),
		none: z.lazy(() => TicketCommentWhereInputSchema).optional(),
	});

export const TicketHistoryListRelationFilterSchema: z.ZodType<Prisma.TicketHistoryListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
		some: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
		none: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
	});

export const NotificationListRelationFilterSchema: z.ZodType<Prisma.NotificationListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => NotificationWhereInputSchema).optional(),
		some: z.lazy(() => NotificationWhereInputSchema).optional(),
		none: z.lazy(() => NotificationWhereInputSchema).optional(),
	});

export const TechSupportListRelationFilterSchema: z.ZodType<Prisma.TechSupportListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => TechSupportWhereInputSchema).optional(),
		some: z.lazy(() => TechSupportWhereInputSchema).optional(),
		none: z.lazy(() => TechSupportWhereInputSchema).optional(),
	});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
	z.strictObject({
		sort: z.lazy(() => SortOrderSchema),
		nulls: z.lazy(() => NullsOrderSchema).optional(),
	});

export const PasswordResetTokenOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TicketOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCommentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TicketCommentOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketHistoryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TicketHistoryOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const NotificationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.NotificationOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const TechSupportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TechSupportOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		supabaseUid: z.lazy(() => SortOrderSchema).optional(),
		username: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		passwordHash: z.lazy(() => SortOrderSchema).optional(),
		role: z.lazy(() => SortOrderSchema).optional(),
		fullName: z.lazy(() => SortOrderSchema).optional(),
		avatarUrl: z.lazy(() => SortOrderSchema).optional(),
		phone: z.lazy(() => SortOrderSchema).optional(),
		isActive: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		supabaseUid: z.lazy(() => SortOrderSchema).optional(),
		username: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		passwordHash: z.lazy(() => SortOrderSchema).optional(),
		role: z.lazy(() => SortOrderSchema).optional(),
		fullName: z.lazy(() => SortOrderSchema).optional(),
		avatarUrl: z.lazy(() => SortOrderSchema).optional(),
		phone: z.lazy(() => SortOrderSchema).optional(),
		isActive: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		supabaseUid: z.lazy(() => SortOrderSchema).optional(),
		username: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		passwordHash: z.lazy(() => SortOrderSchema).optional(),
		role: z.lazy(() => SortOrderSchema).optional(),
		fullName: z.lazy(() => SortOrderSchema).optional(),
		avatarUrl: z.lazy(() => SortOrderSchema).optional(),
		phone: z.lazy(() => SortOrderSchema).optional(),
		isActive: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		lastLoginAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedStringFilterSchema).optional(),
		_max: z.lazy(() => NestedStringFilterSchema).optional(),
	});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([
				z.string(),
				z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
			])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
	});

export const EnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumUserRoleWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => UserRoleSchema).optional(),
		in: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
	});

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
	z.strictObject({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedBoolFilterSchema).optional(),
		_max: z.lazy(() => NestedBoolFilterSchema).optional(),
	});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
	z.strictObject({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
	});

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
			])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
	});

export const EnumTechSupportSpecialtyFilterSchema: z.ZodType<Prisma.EnumTechSupportSpecialtyFilter> =
	z.strictObject({
		equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
		in: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema),
			])
			.optional(),
	});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
	z.strictObject({
		is: z.lazy(() => UserWhereInputSchema).optional(),
		isNot: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const TechSupportCountOrderByAggregateInputSchema: z.ZodType<Prisma.TechSupportCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		speciality: z.lazy(() => SortOrderSchema).optional(),
	});

export const TechSupportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TechSupportMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		speciality: z.lazy(() => SortOrderSchema).optional(),
	});

export const TechSupportMinOrderByAggregateInputSchema: z.ZodType<Prisma.TechSupportMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		speciality: z.lazy(() => SortOrderSchema).optional(),
	});

export const EnumTechSupportSpecialtyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTechSupportSpecialtyWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
		in: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
	});

export const PasswordResetTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		token: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		expiresAt: z.lazy(() => SortOrderSchema).optional(),
		usedAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const PasswordResetTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		token: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		expiresAt: z.lazy(() => SortOrderSchema).optional(),
		usedAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const PasswordResetTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.PasswordResetTokenMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		token: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		expiresAt: z.lazy(() => SortOrderSchema).optional(),
		usedAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCategoryCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCategoryMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCategoryMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const EnumTicketStatusFilterSchema: z.ZodType<Prisma.EnumTicketStatusFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketStatusSchema).optional(),
		in: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => NestedEnumTicketStatusFilterSchema),
			])
			.optional(),
	});

export const EnumTicketPriorityFilterSchema: z.ZodType<Prisma.EnumTicketPriorityFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketPrioritySchema).optional(),
		in: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => NestedEnumTicketPriorityFilterSchema),
			])
			.optional(),
	});

export const UserNullableScalarRelationFilterSchema: z.ZodType<Prisma.UserNullableScalarRelationFilter> =
	z.strictObject({
		is: z
			.lazy(() => UserWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => UserWhereInputSchema)
			.optional()
			.nullable(),
	});

export const TicketCategoryNullableScalarRelationFilterSchema: z.ZodType<Prisma.TicketCategoryNullableScalarRelationFilter> =
	z.strictObject({
		is: z
			.lazy(() => TicketCategoryWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => TicketCategoryWhereInputSchema)
			.optional()
			.nullable(),
	});

export const AttachmentListRelationFilterSchema: z.ZodType<Prisma.AttachmentListRelationFilter> =
	z.strictObject({
		every: z.lazy(() => AttachmentWhereInputSchema).optional(),
		some: z.lazy(() => AttachmentWhereInputSchema).optional(),
		none: z.lazy(() => AttachmentWhereInputSchema).optional(),
	});

export const TechSupportNullableScalarRelationFilterSchema: z.ZodType<Prisma.TechSupportNullableScalarRelationFilter> =
	z.strictObject({
		is: z
			.lazy(() => TechSupportWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => TechSupportWhereInputSchema)
			.optional()
			.nullable(),
	});

export const AttachmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AttachmentOrderByRelationAggregateInput> =
	z.strictObject({
		_count: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		status: z.lazy(() => SortOrderSchema).optional(),
		priority: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		resolvedAt: z.lazy(() => SortOrderSchema).optional(),
		closedAt: z.lazy(() => SortOrderSchema).optional(),
		creatorId: z.lazy(() => SortOrderSchema).optional(),
		assigneeId: z.lazy(() => SortOrderSchema).optional(),
		categoryId: z.lazy(() => SortOrderSchema).optional(),
		techSupportId: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		status: z.lazy(() => SortOrderSchema).optional(),
		priority: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		resolvedAt: z.lazy(() => SortOrderSchema).optional(),
		closedAt: z.lazy(() => SortOrderSchema).optional(),
		creatorId: z.lazy(() => SortOrderSchema).optional(),
		assigneeId: z.lazy(() => SortOrderSchema).optional(),
		categoryId: z.lazy(() => SortOrderSchema).optional(),
		techSupportId: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		description: z.lazy(() => SortOrderSchema).optional(),
		status: z.lazy(() => SortOrderSchema).optional(),
		priority: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
		resolvedAt: z.lazy(() => SortOrderSchema).optional(),
		closedAt: z.lazy(() => SortOrderSchema).optional(),
		creatorId: z.lazy(() => SortOrderSchema).optional(),
		assigneeId: z.lazy(() => SortOrderSchema).optional(),
		categoryId: z.lazy(() => SortOrderSchema).optional(),
		techSupportId: z.lazy(() => SortOrderSchema).optional(),
	});

export const EnumTicketStatusWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTicketStatusWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketStatusSchema).optional(),
		in: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
	});

export const EnumTicketPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTicketPriorityWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketPrioritySchema).optional(),
		in: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => NestedEnumTicketPriorityWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
	});

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.strictObject({
	equals: z.number().optional(),
	in: z.number().array().optional(),
	notIn: z.number().array().optional(),
	lt: z.number().optional(),
	lte: z.number().optional(),
	gt: z.number().optional(),
	gte: z.number().optional(),
	not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});

export const EnumAttachmentSourceFilterSchema: z.ZodType<Prisma.EnumAttachmentSourceFilter> =
	z.strictObject({
		equals: z.lazy(() => AttachmentSourceSchema).optional(),
		in: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => NestedEnumAttachmentSourceFilterSchema),
			])
			.optional(),
	});

export const TicketScalarRelationFilterSchema: z.ZodType<Prisma.TicketScalarRelationFilter> =
	z.strictObject({
		is: z.lazy(() => TicketWhereInputSchema).optional(),
		isNot: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const AttachmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		fileName: z.lazy(() => SortOrderSchema).optional(),
		fileUrl: z.lazy(() => SortOrderSchema).optional(),
		fileSize: z.lazy(() => SortOrderSchema).optional(),
		mimeType: z.lazy(() => SortOrderSchema).optional(),
		source: z.lazy(() => SortOrderSchema).optional(),
		uploadedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const AttachmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentAvgOrderByAggregateInput> =
	z.strictObject({
		fileSize: z.lazy(() => SortOrderSchema).optional(),
	});

export const AttachmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		fileName: z.lazy(() => SortOrderSchema).optional(),
		fileUrl: z.lazy(() => SortOrderSchema).optional(),
		fileSize: z.lazy(() => SortOrderSchema).optional(),
		mimeType: z.lazy(() => SortOrderSchema).optional(),
		source: z.lazy(() => SortOrderSchema).optional(),
		uploadedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const AttachmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		fileName: z.lazy(() => SortOrderSchema).optional(),
		fileUrl: z.lazy(() => SortOrderSchema).optional(),
		fileSize: z.lazy(() => SortOrderSchema).optional(),
		mimeType: z.lazy(() => SortOrderSchema).optional(),
		source: z.lazy(() => SortOrderSchema).optional(),
		uploadedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const AttachmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.AttachmentSumOrderByAggregateInput> =
	z.strictObject({
		fileSize: z.lazy(() => SortOrderSchema).optional(),
	});

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
	z.strictObject({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
		_sum: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedIntFilterSchema).optional(),
		_max: z.lazy(() => NestedIntFilterSchema).optional(),
	});

export const EnumAttachmentSourceWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAttachmentSourceWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => AttachmentSourceSchema).optional(),
		in: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => NestedEnumAttachmentSourceWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
	});

export const TicketCommentCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCommentCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		authorId: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCommentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCommentMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		authorId: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketCommentMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCommentMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		authorId: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
		updatedAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketHistoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketHistoryCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		changedById: z.lazy(() => SortOrderSchema).optional(),
		field: z.lazy(() => SortOrderSchema).optional(),
		oldValue: z.lazy(() => SortOrderSchema).optional(),
		newValue: z.lazy(() => SortOrderSchema).optional(),
		note: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketHistoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketHistoryMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		changedById: z.lazy(() => SortOrderSchema).optional(),
		field: z.lazy(() => SortOrderSchema).optional(),
		oldValue: z.lazy(() => SortOrderSchema).optional(),
		newValue: z.lazy(() => SortOrderSchema).optional(),
		note: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const TicketHistoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketHistoryMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		changedById: z.lazy(() => SortOrderSchema).optional(),
		field: z.lazy(() => SortOrderSchema).optional(),
		oldValue: z.lazy(() => SortOrderSchema).optional(),
		newValue: z.lazy(() => SortOrderSchema).optional(),
		note: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const EnumNotificationTypeFilterSchema: z.ZodType<Prisma.EnumNotificationTypeFilter> =
	z.strictObject({
		equals: z.lazy(() => NotificationTypeSchema).optional(),
		in: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => NestedEnumNotificationTypeFilterSchema),
			])
			.optional(),
	});

export const TicketNullableScalarRelationFilterSchema: z.ZodType<Prisma.TicketNullableScalarRelationFilter> =
	z.strictObject({
		is: z
			.lazy(() => TicketWhereInputSchema)
			.optional()
			.nullable(),
		isNot: z
			.lazy(() => TicketWhereInputSchema)
			.optional()
			.nullable(),
	});

export const NotificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationCountOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		type: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		isRead: z.lazy(() => SortOrderSchema).optional(),
		readAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const NotificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMaxOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		type: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		isRead: z.lazy(() => SortOrderSchema).optional(),
		readAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const NotificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.NotificationMinOrderByAggregateInput> =
	z.strictObject({
		id: z.lazy(() => SortOrderSchema).optional(),
		userId: z.lazy(() => SortOrderSchema).optional(),
		ticketId: z.lazy(() => SortOrderSchema).optional(),
		type: z.lazy(() => SortOrderSchema).optional(),
		title: z.lazy(() => SortOrderSchema).optional(),
		body: z.lazy(() => SortOrderSchema).optional(),
		isRead: z.lazy(() => SortOrderSchema).optional(),
		readAt: z.lazy(() => SortOrderSchema).optional(),
		createdAt: z.lazy(() => SortOrderSchema).optional(),
	});

export const EnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumNotificationTypeWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => NotificationTypeSchema).optional(),
		in: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
	});

export const PasswordResetTokenCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(),
				z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutCreatorInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutAssigneeInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentCreateNestedManyWithoutAuthorInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryCreateNestedManyWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryCreateNestedManyWithoutChangedByInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const NotificationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutUserInputSchema),
				z.lazy(() => NotificationCreateWithoutUserInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TechSupportCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(),
				z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedCreateNestedManyWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutCreatorInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutAssigneeInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUncheckedCreateNestedManyWithoutAuthorInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedCreateNestedManyWithoutChangedByInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutUserInputSchema),
				z.lazy(() => NotificationCreateWithoutUserInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUncheckedCreateNestedManyWithoutUserInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.string().optional(),
	});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.string().optional().nullable(),
	});

export const EnumUserRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumUserRoleFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => UserRoleSchema).optional(),
	});

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.boolean().optional(),
	});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.coerce.date().optional(),
	});

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.coerce.date().optional().nullable(),
	});

export const PasswordResetTokenUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(),
				z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutCreatorNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutAssigneeNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.TicketCommentUpdateManyWithoutAuthorNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUpdateManyWithoutChangedByNestedInputSchema: z.ZodType<Prisma.TicketHistoryUpdateManyWithoutChangedByNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutUserInputSchema),
				z.lazy(() => NotificationCreateWithoutUserInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TechSupportUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TechSupportScalarWhereInputSchema),
				z.lazy(() => TechSupportScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
				z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(),
				z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema),
				z
					.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
				z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(
					() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema,
				),
				z
					.lazy(
						() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema,
					)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutCreatorNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutAssigneeNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateManyWithoutAuthorNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
				z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema),
				z
					.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema,
					)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutUserInputSchema),
				z.lazy(() => NotificationCreateWithoutUserInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema),
				z
					.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateManyWithoutUserNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema),
				z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TechSupportWhereUniqueInputSchema),
				z.lazy(() => TechSupportWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema),
				z
					.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TechSupportScalarWhereInputSchema),
				z.lazy(() => TechSupportScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const UserCreateNestedOneWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTechSupportsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTechSupportsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTechSupportsInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const TicketCreateNestedManyWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutTechSupportInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutTechSupportInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTechSupportSpecialtyFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => TechSupportSpecialtySchema).optional(),
	});

export const UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTechSupportsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTechSupportsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTechSupportsInputSchema)
			.optional(),
		upsert: z.lazy(() => UserUpsertWithoutTechSupportsInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutTechSupportsInputSchema),
				z.lazy(() => UserUpdateWithoutTechSupportsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema),
			])
			.optional(),
	});

export const TicketUpdateManyWithoutTechSupportNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutTechSupportNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutTechSupportNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
				z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const UserCreateNestedOneWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPasswordResetTokensInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPasswordResetTokensNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputSchema)
			.optional(),
		upsert: z
			.lazy(() => UserUpsertWithoutPasswordResetTokensInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(
					() => UserUpdateToOneWithWhereWithoutPasswordResetTokensInputSchema,
				),
				z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema),
			])
			.optional(),
	});

export const TicketCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutCategoryInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutCategoryInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutCategoryNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutCategoryNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema),
				z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketWhereUniqueInputSchema),
				z.lazy(() => TicketWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema),
				z
					.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const UserCreateNestedOneWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTicketsCreatedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketsCreatedInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const UserCreateNestedOneWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTicketsAssignedToInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketsAssignedToInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const TicketCategoryCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryCreateNestedOneWithoutTicketsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema),
				z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCategoryCreateOrConnectWithoutTicketsInputSchema)
			.optional(),
		connect: z.lazy(() => TicketCategoryWhereUniqueInputSchema).optional(),
	});

export const AttachmentCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const NotificationCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.NotificationCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutTicketInputSchema),
				z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportCreateNestedOneWithoutTicketsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutTicketsInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TechSupportCreateOrConnectWithoutTicketsInputSchema)
			.optional(),
		connect: z.lazy(() => TechSupportWhereUniqueInputSchema).optional(),
	});

export const AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array(),
			])
			.optional(),
		createMany: z
			.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUncheckedCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUncheckedCreateNestedManyWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateNestedManyWithoutTicketInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutTicketInputSchema),
				z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema)
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
	});

export const EnumTicketStatusFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTicketStatusFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => TicketStatusSchema).optional(),
	});

export const EnumTicketPriorityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTicketPriorityFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => TicketPrioritySchema).optional(),
	});

export const UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTicketsCreatedNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketsCreatedInputSchema)
			.optional(),
		upsert: z.lazy(() => UserUpsertWithoutTicketsCreatedInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutTicketsCreatedInputSchema),
				z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema),
			])
			.optional(),
	});

export const UserUpdateOneWithoutTicketsAssignedToNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutTicketsAssignedToNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketsAssignedToInputSchema)
			.optional(),
		upsert: z
			.lazy(() => UserUpsertWithoutTicketsAssignedToInputSchema)
			.optional(),
		disconnect: z
			.union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
			.optional(),
		delete: z
			.union([z.boolean(), z.lazy(() => UserWhereInputSchema)])
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(
					() => UserUpdateToOneWithWhereWithoutTicketsAssignedToInputSchema,
				),
				z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema),
			])
			.optional(),
	});

export const TicketCategoryUpdateOneWithoutTicketsNestedInputSchema: z.ZodType<Prisma.TicketCategoryUpdateOneWithoutTicketsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema),
				z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCategoryCreateOrConnectWithoutTicketsInputSchema)
			.optional(),
		upsert: z
			.lazy(() => TicketCategoryUpsertWithoutTicketsInputSchema)
			.optional(),
		disconnect: z
			.union([z.boolean(), z.lazy(() => TicketCategoryWhereInputSchema)])
			.optional(),
		delete: z
			.union([z.boolean(), z.lazy(() => TicketCategoryWhereInputSchema)])
			.optional(),
		connect: z.lazy(() => TicketCategoryWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(
					() => TicketCategoryUpdateToOneWithWhereWithoutTicketsInputSchema,
				),
				z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema),
				z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema),
			])
			.optional(),
	});

export const AttachmentUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.AttachmentUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => AttachmentScalarWhereInputSchema),
				z.lazy(() => AttachmentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.TicketCommentUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.TicketHistoryUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutTicketInputSchema),
				z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TechSupportUpdateOneWithoutTicketsNestedInputSchema: z.ZodType<Prisma.TechSupportUpdateOneWithoutTicketsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TechSupportCreateWithoutTicketsInputSchema),
				z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TechSupportCreateOrConnectWithoutTicketsInputSchema)
			.optional(),
		upsert: z.lazy(() => TechSupportUpsertWithoutTicketsInputSchema).optional(),
		disconnect: z
			.union([z.boolean(), z.lazy(() => TechSupportWhereInputSchema)])
			.optional(),
		delete: z
			.union([z.boolean(), z.lazy(() => TechSupportWhereInputSchema)])
			.optional(),
		connect: z.lazy(() => TechSupportWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => TechSupportUpdateToOneWithWhereWithoutTicketsInputSchema),
				z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema),
				z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema),
			])
			.optional(),
	});

export const AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
				z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema),
				z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => AttachmentWhereUniqueInputSchema),
				z.lazy(() => AttachmentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => AttachmentScalarWhereInputSchema),
				z.lazy(() => AttachmentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
				z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketCommentWhereUniqueInputSchema),
				z.lazy(() => TicketCommentWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
				z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(),
				z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(
					() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => TicketHistoryWhereUniqueInputSchema),
				z.lazy(() => TicketHistoryWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(
					() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema,
				),
				z
					.lazy(
						() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema,
					)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutTicketNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => NotificationCreateWithoutTicketInputSchema),
				z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(),
				z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		connectOrCreate: z
			.union([
				z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema),
				z
					.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		upsert: z
			.union([
				z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		createMany: z
			.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema)
			.optional(),
		set: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		disconnect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		delete: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		connect: z
			.union([
				z.lazy(() => NotificationWhereUniqueInputSchema),
				z.lazy(() => NotificationWhereUniqueInputSchema).array(),
			])
			.optional(),
		update: z
			.union([
				z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		updateMany: z
			.union([
				z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema),
				z
					.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema)
					.array(),
			])
			.optional(),
		deleteMany: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
	});

export const TicketCreateNestedOneWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketCreateNestedOneWithoutAttachmentsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAttachmentsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutAttachmentsInputSchema)
			.optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
	});

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.number().optional(),
		increment: z.number().optional(),
		decrement: z.number().optional(),
		multiply: z.number().optional(),
		divide: z.number().optional(),
	});

export const EnumAttachmentSourceFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAttachmentSourceFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => AttachmentSourceSchema).optional(),
	});

export const TicketUpdateOneRequiredWithoutAttachmentsNestedInputSchema: z.ZodType<Prisma.TicketUpdateOneRequiredWithoutAttachmentsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutAttachmentsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutAttachmentsInputSchema)
			.optional(),
		upsert: z.lazy(() => TicketUpsertWithoutAttachmentsInputSchema).optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateToOneWithWhereWithoutAttachmentsInputSchema),
				z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema),
				z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema),
			])
			.optional(),
	});

export const TicketCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.TicketCreateNestedOneWithoutCommentsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCommentsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutCommentsInputSchema)
			.optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
	});

export const UserCreateNestedOneWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCommentsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCommentsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const TicketUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.TicketUpdateOneRequiredWithoutCommentsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutCommentsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutCommentsInputSchema)
			.optional(),
		upsert: z.lazy(() => TicketUpsertWithoutCommentsInputSchema).optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateToOneWithWhereWithoutCommentsInputSchema),
				z.lazy(() => TicketUpdateWithoutCommentsInputSchema),
				z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema),
			])
			.optional(),
	});

export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCommentsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutCommentsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema)
			.optional(),
		upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema),
				z.lazy(() => UserUpdateWithoutCommentsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
			])
			.optional(),
	});

export const TicketCreateNestedOneWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketCreateNestedOneWithoutHistoriesInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutHistoriesInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutHistoriesInputSchema)
			.optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
	});

export const UserCreateNestedOneWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTicketHistoriesInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketHistoriesInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema: z.ZodType<Prisma.TicketUpdateOneRequiredWithoutHistoriesNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutHistoriesInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutHistoriesInputSchema)
			.optional(),
		upsert: z.lazy(() => TicketUpsertWithoutHistoriesInputSchema).optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateToOneWithWhereWithoutHistoriesInputSchema),
				z.lazy(() => TicketUpdateWithoutHistoriesInputSchema),
				z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema),
			])
			.optional(),
	});

export const UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTicketHistoriesNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutTicketHistoriesInputSchema)
			.optional(),
		upsert: z
			.lazy(() => UserUpsertWithoutTicketHistoriesInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutTicketHistoriesInputSchema),
				z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema),
			])
			.optional(),
	});

export const UserCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutNotificationsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutNotificationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema)
			.optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
	});

export const TicketCreateNestedOneWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketCreateNestedOneWithoutNotificationsInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutNotificationsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutNotificationsInputSchema)
			.optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
	});

export const EnumNotificationTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumNotificationTypeFieldUpdateOperationsInput> =
	z.strictObject({
		set: z.lazy(() => NotificationTypeSchema).optional(),
	});

export const UserUpdateOneRequiredWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutNotificationsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => UserCreateWithoutNotificationsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema)
			.optional(),
		upsert: z.lazy(() => UserUpsertWithoutNotificationsInputSchema).optional(),
		connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputSchema),
				z.lazy(() => UserUpdateWithoutNotificationsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema),
			])
			.optional(),
	});

export const TicketUpdateOneWithoutNotificationsNestedInputSchema: z.ZodType<Prisma.TicketUpdateOneWithoutNotificationsNestedInput> =
	z.strictObject({
		create: z
			.union([
				z.lazy(() => TicketCreateWithoutNotificationsInputSchema),
				z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema),
			])
			.optional(),
		connectOrCreate: z
			.lazy(() => TicketCreateOrConnectWithoutNotificationsInputSchema)
			.optional(),
		upsert: z
			.lazy(() => TicketUpsertWithoutNotificationsInputSchema)
			.optional(),
		disconnect: z
			.union([z.boolean(), z.lazy(() => TicketWhereInputSchema)])
			.optional(),
		delete: z
			.union([z.boolean(), z.lazy(() => TicketWhereInputSchema)])
			.optional(),
		connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
		update: z
			.union([
				z.lazy(() => TicketUpdateToOneWithWhereWithoutNotificationsInputSchema),
				z.lazy(() => TicketUpdateWithoutNotificationsInputSchema),
				z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema),
			])
			.optional(),
	});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
	z.strictObject({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringFilterSchema)])
			.optional(),
	});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
			.optional()
			.nullable(),
	});

export const NestedEnumUserRoleFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleFilter> =
	z.strictObject({
		equals: z.lazy(() => UserRoleSchema).optional(),
		in: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => NestedEnumUserRoleFilterSchema),
			])
			.optional(),
	});

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> =
	z.strictObject({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
			.optional(),
	});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
	z.strictObject({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
			.optional(),
	});

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
	z.strictObject({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeNullableFilterSchema),
			])
			.optional()
			.nullable(),
	});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedStringFilterSchema).optional(),
		_max: z.lazy(() => NestedStringFilterSchema).optional(),
	});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
	z.strictObject({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
	});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([
				z.string(),
				z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
			])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
	});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
	z.strictObject({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
			.optional()
			.nullable(),
	});

export const NestedEnumUserRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumUserRoleWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => UserRoleSchema).optional(),
		in: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => UserRoleSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
	});

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
	z.strictObject({
		equals: z.boolean().optional(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedBoolFilterSchema).optional(),
		_max: z.lazy(() => NestedBoolFilterSchema).optional(),
	});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z.strictObject({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
	});

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
	z.strictObject({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([
				z.coerce.date(),
				z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
			])
			.optional()
			.nullable(),
		_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
	});

export const NestedEnumTechSupportSpecialtyFilterSchema: z.ZodType<Prisma.NestedEnumTechSupportSpecialtyFilter> =
	z.strictObject({
		equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
		in: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema),
			])
			.optional(),
	});

export const NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTechSupportSpecialtyWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
		in: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TechSupportSpecialtySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
	});

export const NestedEnumTicketStatusFilterSchema: z.ZodType<Prisma.NestedEnumTicketStatusFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketStatusSchema).optional(),
		in: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => NestedEnumTicketStatusFilterSchema),
			])
			.optional(),
	});

export const NestedEnumTicketPriorityFilterSchema: z.ZodType<Prisma.NestedEnumTicketPriorityFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketPrioritySchema).optional(),
		in: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => NestedEnumTicketPriorityFilterSchema),
			])
			.optional(),
	});

export const NestedEnumTicketStatusWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTicketStatusWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketStatusSchema).optional(),
		in: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketStatusSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
	});

export const NestedEnumTicketPriorityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTicketPriorityWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => TicketPrioritySchema).optional(),
		in: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => TicketPrioritySchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => NestedEnumTicketPriorityWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
	});

export const NestedEnumAttachmentSourceFilterSchema: z.ZodType<Prisma.NestedEnumAttachmentSourceFilter> =
	z.strictObject({
		equals: z.lazy(() => AttachmentSourceSchema).optional(),
		in: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => NestedEnumAttachmentSourceFilterSchema),
			])
			.optional(),
	});

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
	z.strictObject({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
		_sum: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedIntFilterSchema).optional(),
		_max: z.lazy(() => NestedIntFilterSchema).optional(),
	});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> =
	z.strictObject({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
			.optional(),
	});

export const NestedEnumAttachmentSourceWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAttachmentSourceWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => AttachmentSourceSchema).optional(),
		in: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => AttachmentSourceSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => NestedEnumAttachmentSourceWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
	});

export const NestedEnumNotificationTypeFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeFilter> =
	z.strictObject({
		equals: z.lazy(() => NotificationTypeSchema).optional(),
		in: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => NestedEnumNotificationTypeFilterSchema),
			])
			.optional(),
	});

export const NestedEnumNotificationTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumNotificationTypeWithAggregatesFilter> =
	z.strictObject({
		equals: z.lazy(() => NotificationTypeSchema).optional(),
		in: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => NotificationTypeSchema)
			.array()
			.optional(),
		not: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema),
			])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
	});

export const PasswordResetTokenCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const PasswordResetTokenUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const PasswordResetTokenCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateOrConnectWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
			z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const PasswordResetTokenCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => PasswordResetTokenCreateManyUserInputSchema),
			z.lazy(() => PasswordResetTokenCreateManyUserInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketCreateWithoutCreatorInputSchema: z.ZodType<Prisma.TicketCreateWithoutCreatorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutCreatorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutCreatorInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutCreatorInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCreatorInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
		]),
	});

export const TicketCreateManyCreatorInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyCreatorInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCreateManyCreatorInputSchema),
			z.lazy(() => TicketCreateManyCreatorInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketCreateWithoutAssigneeInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutAssigneeInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutAssigneeInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
		]),
	});

export const TicketCreateManyAssigneeInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyAssigneeInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCreateManyAssigneeInputSchema),
			z.lazy(() => TicketCreateManyAssigneeInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketCommentCreateWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentCreateWithoutAuthorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		ticket: z.lazy(() => TicketCreateNestedOneWithoutCommentsInputSchema),
	});

export const TicketCommentUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUncheckedCreateWithoutAuthorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketCommentCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentCreateOrConnectWithoutAuthorInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
			z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
		]),
	});

export const TicketCommentCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.TicketCommentCreateManyAuthorInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCommentCreateManyAuthorInputSchema),
			z.lazy(() => TicketCommentCreateManyAuthorInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketHistoryCreateWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryCreateWithoutChangedByInput> =
	z.strictObject({
		id: z.uuid().optional(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		ticket: z.lazy(() => TicketCreateNestedOneWithoutHistoriesInputSchema),
	});

export const TicketHistoryUncheckedCreateWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedCreateWithoutChangedByInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketHistoryCreateOrConnectWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryCreateOrConnectWithoutChangedByInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
			z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
		]),
	});

export const TicketHistoryCreateManyChangedByInputEnvelopeSchema: z.ZodType<Prisma.TicketHistoryCreateManyChangedByInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketHistoryCreateManyChangedByInputSchema),
			z.lazy(() => TicketHistoryCreateManyChangedByInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const NotificationCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		ticket: z
			.lazy(() => TicketCreateNestedOneWithoutNotificationsInputSchema)
			.optional(),
	});

export const NotificationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string().optional().nullable(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => NotificationCreateWithoutUserInputSchema),
			z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const NotificationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyUserInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => NotificationCreateManyUserInputSchema),
			z.lazy(() => NotificationCreateManyUserInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TechSupportCreateWithoutUserInputSchema: z.ZodType<Prisma.TechSupportCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
		tickets: z
			.lazy(() => TicketCreateNestedManyWithoutTechSupportInputSchema)
			.optional(),
	});

export const TechSupportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUncheckedCreateWithoutUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
		tickets: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema)
			.optional(),
	});

export const TechSupportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TechSupportCreateOrConnectWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TechSupportCreateWithoutUserInputSchema),
			z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const TechSupportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TechSupportCreateManyUserInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TechSupportCreateManyUserInputSchema),
			z.lazy(() => TechSupportCreateManyUserInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpsertWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),
			z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema),
		]),
		create: z.union([
			z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema),
			z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema),
			z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema),
		]),
	});

export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyWithWhereWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => PasswordResetTokenUpdateManyMutationInputSchema),
			z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema),
		]),
	});

export const PasswordResetTokenScalarWhereInputSchema: z.ZodType<Prisma.PasswordResetTokenScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => PasswordResetTokenScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
				z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		expiresAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		usedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
	});

export const TicketUpsertWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutCreatorInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketUpdateWithoutCreatorInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCreatorInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCreatorInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema),
		]),
	});

export const TicketUpdateWithWhereUniqueWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutCreatorInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutCreatorInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCreatorInputSchema),
		]),
	});

export const TicketUpdateManyWithWhereWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutCreatorInput> =
	z.strictObject({
		where: z.lazy(() => TicketScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateManyMutationInputSchema),
			z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorInputSchema),
		]),
	});

export const TicketScalarWhereInputSchema: z.ZodType<Prisma.TicketScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketScalarWhereInputSchema),
				z.lazy(() => TicketScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		description: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		status: z
			.union([
				z.lazy(() => EnumTicketStatusFilterSchema),
				z.lazy(() => TicketStatusSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => EnumTicketPriorityFilterSchema),
				z.lazy(() => TicketPrioritySchema),
			])
			.optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		resolvedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		closedAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		assigneeId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		categoryId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		techSupportId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
	});

export const TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutAssigneeInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketUpdateWithoutAssigneeInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutAssigneeInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutAssigneeInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema),
		]),
	});

export const TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutAssigneeInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutAssigneeInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutAssigneeInputSchema),
		]),
	});

export const TicketUpdateManyWithWhereWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutAssigneeInput> =
	z.strictObject({
		where: z.lazy(() => TicketScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateManyMutationInputSchema),
			z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeInputSchema),
		]),
	});

export const TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUpsertWithWhereUniqueWithoutAuthorInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketCommentUpdateWithoutAuthorInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateWithoutAuthorInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema),
			z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema),
		]),
	});

export const TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUpdateWithWhereUniqueWithoutAuthorInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketCommentUpdateWithoutAuthorInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateWithoutAuthorInputSchema),
		]),
	});

export const TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUpdateManyWithWhereWithoutAuthorInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketCommentUpdateManyMutationInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorInputSchema),
		]),
	});

export const TicketCommentScalarWhereInputSchema: z.ZodType<Prisma.TicketCommentScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketCommentScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketCommentScalarWhereInputSchema),
				z.lazy(() => TicketCommentScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		authorId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
	});

export const TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUpsertWithWhereUniqueWithoutChangedByInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketHistoryUpdateWithoutChangedByInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateWithoutChangedByInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema),
			z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema),
		]),
	});

export const TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUpdateWithWhereUniqueWithoutChangedByInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketHistoryUpdateWithoutChangedByInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateWithoutChangedByInputSchema),
		]),
	});

export const TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUpdateManyWithWhereWithoutChangedByInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketHistoryUpdateManyMutationInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByInputSchema),
		]),
	});

export const TicketHistoryScalarWhereInputSchema: z.ZodType<Prisma.TicketHistoryScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TicketHistoryScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TicketHistoryScalarWhereInputSchema),
				z.lazy(() => TicketHistoryScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		changedById: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		field: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		oldValue: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		newValue: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		note: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
	});

export const NotificationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => NotificationUpdateWithoutUserInputSchema),
			z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema),
		]),
		create: z.union([
			z.lazy(() => NotificationCreateWithoutUserInputSchema),
			z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const NotificationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => NotificationUpdateWithoutUserInputSchema),
			z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema),
		]),
	});

export const NotificationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => NotificationScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => NotificationUpdateManyMutationInputSchema),
			z.lazy(() => NotificationUncheckedUpdateManyWithoutUserInputSchema),
		]),
	});

export const NotificationScalarWhereInputSchema: z.ZodType<Prisma.NotificationScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => NotificationScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => NotificationScalarWhereInputSchema),
				z.lazy(() => NotificationScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => EnumNotificationTypeFilterSchema),
				z.lazy(() => NotificationTypeSchema),
			])
			.optional(),
		title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		isRead: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
		readAt: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
	});

export const TechSupportUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUpsertWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TechSupportUpdateWithoutUserInputSchema),
			z.lazy(() => TechSupportUncheckedUpdateWithoutUserInputSchema),
		]),
		create: z.union([
			z.lazy(() => TechSupportCreateWithoutUserInputSchema),
			z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema),
		]),
	});

export const TechSupportUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUpdateWithWhereUniqueWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TechSupportUpdateWithoutUserInputSchema),
			z.lazy(() => TechSupportUncheckedUpdateWithoutUserInputSchema),
		]),
	});

export const TechSupportUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUpdateManyWithWhereWithoutUserInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TechSupportUpdateManyMutationInputSchema),
			z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserInputSchema),
		]),
	});

export const TechSupportScalarWhereInputSchema: z.ZodType<Prisma.TechSupportScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => TechSupportScalarWhereInputSchema),
				z.lazy(() => TechSupportScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => TechSupportScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TechSupportScalarWhereInputSchema),
				z.lazy(() => TechSupportScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		updatedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => EnumTechSupportSpecialtyFilterSchema),
				z.lazy(() => TechSupportSpecialtySchema),
			])
			.optional(),
	});

export const UserCreateWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserCreateWithoutTechSupportsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTechSupportsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTechSupportsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutTechSupportsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema),
		]),
	});

export const TicketCreateWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketCreateWithoutTechSupportInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutTechSupportInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutTechSupportInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
		]),
	});

export const TicketCreateManyTechSupportInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyTechSupportInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCreateManyTechSupportInputSchema),
			z.lazy(() => TicketCreateManyTechSupportInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const UserUpsertWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTechSupportsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutTechSupportsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutTechSupportsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTechSupportsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutTechSupportsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema),
		]),
	});

export const UserUpdateWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTechSupportsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutTechSupportsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTechSupportsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutTechSupportInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketUpdateWithoutTechSupportInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutTechSupportInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutTechSupportInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema),
		]),
	});

export const TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutTechSupportInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutTechSupportInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutTechSupportInputSchema),
		]),
	});

export const TicketUpdateManyWithWhereWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutTechSupportInput> =
	z.strictObject({
		where: z.lazy(() => TicketScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateManyMutationInputSchema),
			z.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportInputSchema),
		]),
	});

export const UserCreateWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserCreateWithoutPasswordResetTokensInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPasswordResetTokensInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPasswordResetTokensInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema),
		]),
	});

export const UserUpsertWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserUpsertWithoutPasswordResetTokensInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPasswordResetTokensInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema),
		]),
	});

export const UserUpdateWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserUpdateWithoutPasswordResetTokensInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutPasswordResetTokensInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPasswordResetTokensInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const TicketCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TicketCreateWithoutCategoryInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutCategoryInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutCategoryInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCategoryInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
		]),
	});

export const TicketCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyCategoryInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCreateManyCategoryInputSchema),
			z.lazy(() => TicketCreateManyCategoryInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutCategoryInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketUpdateWithoutCategoryInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCategoryInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCategoryInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema),
		]),
	});

export const TicketUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutCategoryInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutCategoryInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCategoryInputSchema),
		]),
	});

export const TicketUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutCategoryInput> =
	z.strictObject({
		where: z.lazy(() => TicketScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketUpdateManyMutationInputSchema),
			z.lazy(() => TicketUncheckedUpdateManyWithoutCategoryInputSchema),
		]),
	});

export const UserCreateWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserCreateWithoutTicketsCreatedInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTicketsCreatedInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTicketsCreatedInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema),
		]),
	});

export const UserCreateWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserCreateWithoutTicketsAssignedToInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTicketsAssignedToInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTicketsAssignedToInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema),
		]),
	});

export const TicketCategoryCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryCreateWithoutTicketsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		description: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketCategoryUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryUncheckedCreateWithoutTicketsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		name: z.string(),
		description: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketCategoryCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryCreateOrConnectWithoutTicketsInput> =
	z.strictObject({
		where: z.lazy(() => TicketCategoryWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema),
			z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema),
		]),
	});

export const AttachmentCreateWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
	});

export const AttachmentUncheckedCreateWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUncheckedCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
	});

export const AttachmentCreateOrConnectWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentCreateOrConnectWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => AttachmentWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
			z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const AttachmentCreateManyTicketInputEnvelopeSchema: z.ZodType<Prisma.AttachmentCreateManyTicketInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => AttachmentCreateManyTicketInputSchema),
			z.lazy(() => AttachmentCreateManyTicketInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketCommentCreateWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
	});

export const TicketCommentUncheckedCreateWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUncheckedCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		authorId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketCommentCreateOrConnectWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentCreateOrConnectWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
			z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const TicketCommentCreateManyTicketInputEnvelopeSchema: z.ZodType<Prisma.TicketCommentCreateManyTicketInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketCommentCreateManyTicketInputSchema),
			z.lazy(() => TicketCommentCreateManyTicketInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TicketHistoryCreateWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		changedBy: z.lazy(
			() => UserCreateNestedOneWithoutTicketHistoriesInputSchema,
		),
	});

export const TicketHistoryUncheckedCreateWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		changedById: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketHistoryCreateOrConnectWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryCreateOrConnectWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
			z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const TicketHistoryCreateManyTicketInputEnvelopeSchema: z.ZodType<Prisma.TicketHistoryCreateManyTicketInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => TicketHistoryCreateManyTicketInputSchema),
			z.lazy(() => TicketHistoryCreateManyTicketInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const NotificationCreateWithoutTicketInputSchema: z.ZodType<Prisma.NotificationCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
	});

export const NotificationUncheckedCreateWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUncheckedCreateWithoutTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationCreateOrConnectWithoutTicketInputSchema: z.ZodType<Prisma.NotificationCreateOrConnectWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => NotificationCreateWithoutTicketInputSchema),
			z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const NotificationCreateManyTicketInputEnvelopeSchema: z.ZodType<Prisma.NotificationCreateManyTicketInputEnvelope> =
	z.strictObject({
		data: z.union([
			z.lazy(() => NotificationCreateManyTicketInputSchema),
			z.lazy(() => NotificationCreateManyTicketInputSchema).array(),
		]),
		skipDuplicates: z.boolean().optional(),
	});

export const TechSupportCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportCreateWithoutTicketsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
		user: z.lazy(() => UserCreateNestedOneWithoutTechSupportsInputSchema),
	});

export const TechSupportUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportUncheckedCreateWithoutTicketsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
	});

export const TechSupportCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportCreateOrConnectWithoutTicketsInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TechSupportCreateWithoutTicketsInputSchema),
			z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema),
		]),
	});

export const UserUpsertWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserUpsertWithoutTicketsCreatedInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTicketsCreatedInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema),
		]),
	});

export const UserUpdateWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserUpdateWithoutTicketsCreatedInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutTicketsCreatedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTicketsCreatedInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUpsertWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserUpsertWithoutTicketsAssignedToInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTicketsAssignedToInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema),
		]),
	});

export const UserUpdateWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserUpdateWithoutTicketsAssignedToInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutTicketsAssignedToInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTicketsAssignedToInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const TicketCategoryUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryUpsertWithoutTicketsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema),
			z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema),
			z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema),
		]),
		where: z.lazy(() => TicketCategoryWhereInputSchema).optional(),
	});

export const TicketCategoryUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryUpdateToOneWithWhereWithoutTicketsInput> =
	z.strictObject({
		where: z.lazy(() => TicketCategoryWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema),
			z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema),
		]),
	});

export const TicketCategoryUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryUpdateWithoutTicketsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCategoryUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TicketCategoryUncheckedUpdateWithoutTicketsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUpsertWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => AttachmentWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => AttachmentUpdateWithoutTicketInputSchema),
			z.lazy(() => AttachmentUncheckedUpdateWithoutTicketInputSchema),
		]),
		create: z.union([
			z.lazy(() => AttachmentCreateWithoutTicketInputSchema),
			z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUpdateWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => AttachmentWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => AttachmentUpdateWithoutTicketInputSchema),
			z.lazy(() => AttachmentUncheckedUpdateWithoutTicketInputSchema),
		]),
	});

export const AttachmentUpdateManyWithWhereWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUpdateManyWithWhereWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => AttachmentScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => AttachmentUpdateManyMutationInputSchema),
			z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketInputSchema),
		]),
	});

export const AttachmentScalarWhereInputSchema: z.ZodType<Prisma.AttachmentScalarWhereInput> =
	z.strictObject({
		AND: z
			.union([
				z.lazy(() => AttachmentScalarWhereInputSchema),
				z.lazy(() => AttachmentScalarWhereInputSchema).array(),
			])
			.optional(),
		OR: z
			.lazy(() => AttachmentScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AttachmentScalarWhereInputSchema),
				z.lazy(() => AttachmentScalarWhereInputSchema).array(),
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		ticketId: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		fileName: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		fileSize: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		mimeType: z
			.union([z.lazy(() => StringFilterSchema), z.string()])
			.optional(),
		source: z
			.union([
				z.lazy(() => EnumAttachmentSourceFilterSchema),
				z.lazy(() => AttachmentSourceSchema),
			])
			.optional(),
		uploadedAt: z
			.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
			.optional(),
	});

export const TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUpsertWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketCommentUpdateWithoutTicketInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateWithoutTicketInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCommentCreateWithoutTicketInputSchema),
			z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUpdateWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketCommentUpdateWithoutTicketInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateWithoutTicketInputSchema),
		]),
	});

export const TicketCommentUpdateManyWithWhereWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUpdateManyWithWhereWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketCommentScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketCommentUpdateManyMutationInputSchema),
			z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketInputSchema),
		]),
	});

export const TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUpsertWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => TicketHistoryUpdateWithoutTicketInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateWithoutTicketInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema),
			z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUpdateWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => TicketHistoryUpdateWithoutTicketInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateWithoutTicketInputSchema),
		]),
	});

export const TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUpdateManyWithWhereWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => TicketHistoryScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => TicketHistoryUpdateManyMutationInputSchema),
			z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketInputSchema),
		]),
	});

export const NotificationUpsertWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUpsertWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		update: z.union([
			z.lazy(() => NotificationUpdateWithoutTicketInputSchema),
			z.lazy(() => NotificationUncheckedUpdateWithoutTicketInputSchema),
		]),
		create: z.union([
			z.lazy(() => NotificationCreateWithoutTicketInputSchema),
			z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema),
		]),
	});

export const NotificationUpdateWithWhereUniqueWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUpdateWithWhereUniqueWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => NotificationWhereUniqueInputSchema),
		data: z.union([
			z.lazy(() => NotificationUpdateWithoutTicketInputSchema),
			z.lazy(() => NotificationUncheckedUpdateWithoutTicketInputSchema),
		]),
	});

export const NotificationUpdateManyWithWhereWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUpdateManyWithWhereWithoutTicketInput> =
	z.strictObject({
		where: z.lazy(() => NotificationScalarWhereInputSchema),
		data: z.union([
			z.lazy(() => NotificationUpdateManyMutationInputSchema),
			z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketInputSchema),
		]),
	});

export const TechSupportUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportUpsertWithoutTicketsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema),
			z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema),
		]),
		create: z.union([
			z.lazy(() => TechSupportCreateWithoutTicketsInputSchema),
			z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema),
		]),
		where: z.lazy(() => TechSupportWhereInputSchema).optional(),
	});

export const TechSupportUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportUpdateToOneWithWhereWithoutTicketsInput> =
	z.strictObject({
		where: z.lazy(() => TechSupportWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema),
			z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema),
		]),
	});

export const TechSupportUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportUpdateWithoutTicketsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema)
			.optional(),
	});

export const TechSupportUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateWithoutTicketsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCreateWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketCreateWithoutAttachmentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutAttachmentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutAttachmentsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutAttachmentsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema),
		]),
	});

export const TicketUpsertWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketUpsertWithoutAttachmentsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutAttachmentsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema),
		]),
		where: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const TicketUpdateToOneWithWhereWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketUpdateToOneWithWhereWithoutAttachmentsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema),
		]),
	});

export const TicketUpdateWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketUpdateWithoutAttachmentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutAttachmentsInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutAttachmentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TicketCreateWithoutCommentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutCommentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutCommentsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCommentsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema),
		]),
	});

export const UserCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateWithoutCommentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCommentsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutCommentsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCommentsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutCommentsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
		]),
	});

export const TicketUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.TicketUpsertWithoutCommentsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TicketUpdateWithoutCommentsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutCommentsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema),
		]),
		where: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const TicketUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.TicketUpdateToOneWithWhereWithoutCommentsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutCommentsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema),
		]),
	});

export const TicketUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TicketUpdateWithoutCommentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutCommentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const UserUpsertWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCommentsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutCommentsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutCommentsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutCommentsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema),
		]),
	});

export const UserUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCommentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutCommentsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCommentsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const TicketCreateWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketCreateWithoutHistoriesInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutHistoriesInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
	});

export const TicketCreateOrConnectWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutHistoriesInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutHistoriesInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema),
		]),
	});

export const UserCreateWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserCreateWithoutTicketHistoriesInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTicketHistoriesInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTicketHistoriesInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema),
		]),
	});

export const TicketUpsertWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketUpsertWithoutHistoriesInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TicketUpdateWithoutHistoriesInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutHistoriesInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema),
		]),
		where: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const TicketUpdateToOneWithWhereWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketUpdateToOneWithWhereWithoutHistoriesInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutHistoriesInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema),
		]),
	});

export const TicketUpdateWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketUpdateWithoutHistoriesInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutHistoriesInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutHistoriesInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const UserUpsertWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserUpsertWithoutTicketHistoriesInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTicketHistoriesInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema),
		]),
	});

export const UserUpdateWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserUpdateWithoutTicketHistoriesInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutTicketHistoriesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTicketHistoriesInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateWithoutNotificationsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutNotificationsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		supabaseUid: z.string().optional().nullable(),
		username: z.string(),
		email: z.string(),
		passwordHash: z.string(),
		role: z.lazy(() => UserRoleSchema).optional(),
		fullName: z.string(),
		avatarUrl: z.string().optional().nullable(),
		phone: z.string().optional().nullable(),
		isActive: z.boolean().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		lastLoginAt: z.coerce.date().optional().nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema,
			)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema)
			.optional(),
	});

export const UserCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutNotificationsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => UserCreateWithoutNotificationsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema),
		]),
	});

export const TicketCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketCreateWithoutNotificationsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creator: z.lazy(() => UserCreateNestedOneWithoutTicketsCreatedInputSchema),
		assignee: z
			.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema)
			.optional(),
	});

export const TicketUncheckedCreateWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutNotificationsInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema,
			)
			.optional(),
	});

export const TicketCreateOrConnectWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutNotificationsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereUniqueInputSchema),
		create: z.union([
			z.lazy(() => TicketCreateWithoutNotificationsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema),
		]),
	});

export const UserUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutNotificationsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => UserUpdateWithoutNotificationsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema),
		]),
		create: z.union([
			z.lazy(() => UserCreateWithoutNotificationsInputSchema),
			z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema),
		]),
		where: z.lazy(() => UserWhereInputSchema).optional(),
	});

export const UserUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutNotificationsInput> =
	z.strictObject({
		where: z.lazy(() => UserWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => UserUpdateWithoutNotificationsInputSchema),
			z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema),
		]),
	});

export const UserUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutNotificationsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema)
			.optional(),
		ticketHistories: z
			.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const UserUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutNotificationsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		supabaseUid: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		username: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		email: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		passwordHash: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([
				z.lazy(() => UserRoleSchema),
				z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema),
			])
			.optional(),
		fullName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		avatarUrl: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		phone: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		isActive: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		lastLoginAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		passwordResetTokens: z
			.lazy(
				() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema,
			)
			.optional(),
		ticketsCreated: z
			.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema)
			.optional(),
		ticketsAssignedTo: z
			.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema,
			)
			.optional(),
		ticketHistories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema,
			)
			.optional(),
		techSupports: z
			.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema)
			.optional(),
	});

export const TicketUpsertWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketUpsertWithoutNotificationsInput> =
	z.strictObject({
		update: z.union([
			z.lazy(() => TicketUpdateWithoutNotificationsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema),
		]),
		create: z.union([
			z.lazy(() => TicketCreateWithoutNotificationsInputSchema),
			z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema),
		]),
		where: z.lazy(() => TicketWhereInputSchema).optional(),
	});

export const TicketUpdateToOneWithWhereWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketUpdateToOneWithWhereWithoutNotificationsInput> =
	z.strictObject({
		where: z.lazy(() => TicketWhereInputSchema).optional(),
		data: z.union([
			z.lazy(() => TicketUpdateWithoutNotificationsInputSchema),
			z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema),
		]),
	});

export const TicketUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketUpdateWithoutNotificationsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutNotificationsInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutNotificationsInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
	});

export const PasswordResetTokenCreateManyUserInputSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		token: z.string(),
		expiresAt: z.coerce.date(),
		usedAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TicketCreateManyCreatorInputSchema: z.ZodType<Prisma.TicketCreateManyCreatorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
	});

export const TicketCreateManyAssigneeInputSchema: z.ZodType<Prisma.TicketCreateManyAssigneeInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		categoryId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
	});

export const TicketCommentCreateManyAuthorInputSchema: z.ZodType<Prisma.TicketCommentCreateManyAuthorInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketHistoryCreateManyChangedByInputSchema: z.ZodType<Prisma.TicketHistoryCreateManyChangedByInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationCreateManyUserInputSchema: z.ZodType<Prisma.NotificationCreateManyUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		ticketId: z.string().optional().nullable(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const TechSupportCreateManyUserInputSchema: z.ZodType<Prisma.TechSupportCreateManyUserInput> =
	z.strictObject({
		id: z.uuid().optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
	});

export const PasswordResetTokenUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PasswordResetTokenUncheckedUpdateManyWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expiresAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		usedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUpdateWithoutCreatorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutCreatorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutCreatorInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutCreatorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TicketUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUpdateWithoutAssigneeInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutAssigneeInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutAssigneeInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutAssigneeInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TicketCommentUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUpdateWithoutAuthorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneRequiredWithoutCommentsNestedInputSchema)
			.optional(),
	});

export const TicketCommentUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateWithoutAuthorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateManyWithoutAuthorInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryUpdateWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUpdateWithoutChangedByInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema)
			.optional(),
	});

export const TicketHistoryUncheckedUpdateWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateWithoutChangedByInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryUncheckedUpdateManyWithoutChangedByInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateManyWithoutChangedByInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		ticket: z
			.lazy(() => TicketUpdateOneWithoutNotificationsNestedInputSchema)
			.optional(),
	});

export const NotificationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		ticketId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TechSupportUpdateWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tickets: z
			.lazy(() => TicketUpdateManyWithoutTechSupportNestedInputSchema)
			.optional(),
	});

export const TechSupportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
		tickets: z
			.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema)
			.optional(),
	});

export const TechSupportUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TechSupportUncheckedUpdateManyWithoutUserInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		speciality: z
			.union([
				z.lazy(() => TechSupportSpecialtySchema),
				z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCreateManyTechSupportInputSchema: z.ZodType<Prisma.TicketCreateManyTechSupportInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		categoryId: z.string().optional().nullable(),
	});

export const TicketUpdateWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUpdateWithoutTechSupportInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		category: z
			.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutTechSupportInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutTechSupportInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutTechSupportInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		categoryId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const TicketCreateManyCategoryInputSchema: z.ZodType<Prisma.TicketCreateManyCategoryInput> =
	z.strictObject({
		id: z.uuid().optional(),
		title: z.string(),
		description: z.string(),
		status: z.lazy(() => TicketStatusSchema).optional(),
		priority: z.lazy(() => TicketPrioritySchema).optional(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
		resolvedAt: z.coerce.date().optional().nullable(),
		closedAt: z.coerce.date().optional().nullable(),
		creatorId: z.string(),
		assigneeId: z.string().optional().nullable(),
		techSupportId: z.string().optional().nullable(),
	});

export const TicketUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUpdateWithoutCategoryInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creator: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema)
			.optional(),
		assignee: z
			.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema)
			.optional(),
		attachments: z
			.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		histories: z
			.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		notifications: z
			.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		techSupport: z
			.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutCategoryInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		attachments: z
			.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
		comments: z
			.lazy(
				() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		histories: z
			.lazy(
				() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema,
			)
			.optional(),
		notifications: z
			.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema)
			.optional(),
	});

export const TicketUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutCategoryInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		description: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		status: z
			.union([
				z.lazy(() => TicketStatusSchema),
				z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema),
			])
			.optional(),
		priority: z
			.union([
				z.lazy(() => TicketPrioritySchema),
				z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema),
			])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		resolvedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		closedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		creatorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		assigneeId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		techSupportId: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
	});

export const AttachmentCreateManyTicketInputSchema: z.ZodType<Prisma.AttachmentCreateManyTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		fileName: z.string(),
		fileUrl: z.string(),
		fileSize: z.number().int(),
		mimeType: z.string(),
		source: z.lazy(() => AttachmentSourceSchema).optional(),
		uploadedAt: z.coerce.date().optional(),
	});

export const TicketCommentCreateManyTicketInputSchema: z.ZodType<Prisma.TicketCommentCreateManyTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		authorId: z.string(),
		body: z.string(),
		createdAt: z.coerce.date().optional(),
		updatedAt: z.coerce.date().optional(),
	});

export const TicketHistoryCreateManyTicketInputSchema: z.ZodType<Prisma.TicketHistoryCreateManyTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		changedById: z.string(),
		field: z.string(),
		oldValue: z.string().optional().nullable(),
		newValue: z.string().optional().nullable(),
		note: z.string().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const NotificationCreateManyTicketInputSchema: z.ZodType<Prisma.NotificationCreateManyTicketInput> =
	z.strictObject({
		id: z.uuid().optional(),
		userId: z.string(),
		type: z.lazy(() => NotificationTypeSchema),
		title: z.string(),
		body: z.string(),
		isRead: z.boolean().optional(),
		readAt: z.coerce.date().optional().nullable(),
		createdAt: z.coerce.date().optional(),
	});

export const AttachmentUpdateWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const AttachmentUncheckedUpdateWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const AttachmentUncheckedUpdateManyWithoutTicketInputSchema: z.ZodType<Prisma.AttachmentUncheckedUpdateManyWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileName: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileUrl: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		fileSize: z
			.union([
				z.number().int(),
				z.lazy(() => IntFieldUpdateOperationsInputSchema),
			])
			.optional(),
		mimeType: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		source: z
			.union([
				z.lazy(() => AttachmentSourceSchema),
				z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema),
			])
			.optional(),
		uploadedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentUpdateWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		author: z
			.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema)
			.optional(),
	});

export const TicketCommentUncheckedUpdateWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		authorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketCommentUncheckedUpdateManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketCommentUncheckedUpdateManyWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		authorId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		updatedAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryUpdateWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		changedBy: z
			.lazy(() => UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema)
			.optional(),
	});

export const TicketHistoryUncheckedUpdateWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		changedById: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const TicketHistoryUncheckedUpdateManyWithoutTicketInputSchema: z.ZodType<Prisma.TicketHistoryUncheckedUpdateManyWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		changedById: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		field: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		oldValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		newValue: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		note: z
			.union([
				z.string(),
				z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationUpdateWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		user: z
			.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema)
			.optional(),
	});

export const NotificationUncheckedUpdateWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

export const NotificationUncheckedUpdateManyWithoutTicketInputSchema: z.ZodType<Prisma.NotificationUncheckedUpdateManyWithoutTicketInput> =
	z.strictObject({
		id: z
			.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z
			.union([
				z.lazy(() => NotificationTypeSchema),
				z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema),
			])
			.optional(),
		title: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		body: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		isRead: z
			.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
			.optional(),
		readAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
			])
			.optional()
			.nullable(),
		createdAt: z
			.union([
				z.coerce.date(),
				z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
			])
			.optional(),
	});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereInputSchema.optional(),
			orderBy: z
				.union([
					UserOrderByWithRelationInputSchema.array(),
					UserOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: UserWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
				.optional(),
		})
		.strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithRelationInputSchema.array(),
				UserOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([
				UserOrderByWithAggregationInputSchema.array(),
				UserOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: UserScalarFieldEnumSchema.array(),
		having: UserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
	z
		.object({
			select: UserSelectSchema.optional(),
			include: UserIncludeSchema.optional(),
			where: UserWhereUniqueInputSchema,
		})
		.strict();

export const TechSupportFindFirstArgsSchema: z.ZodType<Prisma.TechSupportFindFirstArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereInputSchema.optional(),
			orderBy: z
				.union([
					TechSupportOrderByWithRelationInputSchema.array(),
					TechSupportOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TechSupportWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TechSupportScalarFieldEnumSchema,
					TechSupportScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TechSupportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TechSupportFindFirstOrThrowArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereInputSchema.optional(),
			orderBy: z
				.union([
					TechSupportOrderByWithRelationInputSchema.array(),
					TechSupportOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TechSupportWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TechSupportScalarFieldEnumSchema,
					TechSupportScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TechSupportFindManyArgsSchema: z.ZodType<Prisma.TechSupportFindManyArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereInputSchema.optional(),
			orderBy: z
				.union([
					TechSupportOrderByWithRelationInputSchema.array(),
					TechSupportOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TechSupportWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TechSupportScalarFieldEnumSchema,
					TechSupportScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TechSupportAggregateArgsSchema: z.ZodType<Prisma.TechSupportAggregateArgs> =
	z
		.object({
			where: TechSupportWhereInputSchema.optional(),
			orderBy: z
				.union([
					TechSupportOrderByWithRelationInputSchema.array(),
					TechSupportOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TechSupportWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TechSupportGroupByArgsSchema: z.ZodType<Prisma.TechSupportGroupByArgs> =
	z
		.object({
			where: TechSupportWhereInputSchema.optional(),
			orderBy: z
				.union([
					TechSupportOrderByWithAggregationInputSchema.array(),
					TechSupportOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: TechSupportScalarFieldEnumSchema.array(),
			having: TechSupportScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TechSupportFindUniqueArgsSchema: z.ZodType<Prisma.TechSupportFindUniqueArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereUniqueInputSchema,
		})
		.strict();

export const TechSupportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TechSupportFindUniqueOrThrowArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereUniqueInputSchema,
		})
		.strict();

export const PasswordResetTokenFindFirstArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordResetTokenOrderByWithRelationInputSchema.array(),
					PasswordResetTokenOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordResetTokenScalarFieldEnumSchema,
					PasswordResetTokenScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordResetTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindFirstOrThrowArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordResetTokenOrderByWithRelationInputSchema.array(),
					PasswordResetTokenOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordResetTokenScalarFieldEnumSchema,
					PasswordResetTokenScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordResetTokenFindManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindManyArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordResetTokenOrderByWithRelationInputSchema.array(),
					PasswordResetTokenOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					PasswordResetTokenScalarFieldEnumSchema,
					PasswordResetTokenScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const PasswordResetTokenAggregateArgsSchema: z.ZodType<Prisma.PasswordResetTokenAggregateArgs> =
	z
		.object({
			where: PasswordResetTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordResetTokenOrderByWithRelationInputSchema.array(),
					PasswordResetTokenOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PasswordResetTokenGroupByArgsSchema: z.ZodType<Prisma.PasswordResetTokenGroupByArgs> =
	z
		.object({
			where: PasswordResetTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					PasswordResetTokenOrderByWithAggregationInputSchema.array(),
					PasswordResetTokenOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: PasswordResetTokenScalarFieldEnumSchema.array(),
			having: PasswordResetTokenScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const PasswordResetTokenFindUniqueArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereUniqueInputSchema,
		})
		.strict();

export const PasswordResetTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PasswordResetTokenFindUniqueOrThrowArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereUniqueInputSchema,
		})
		.strict();

export const TicketCategoryFindFirstArgsSchema: z.ZodType<Prisma.TicketCategoryFindFirstArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCategoryOrderByWithRelationInputSchema.array(),
					TicketCategoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCategoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCategoryScalarFieldEnumSchema,
					TicketCategoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketCategoryFindFirstOrThrowArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCategoryOrderByWithRelationInputSchema.array(),
					TicketCategoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCategoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCategoryScalarFieldEnumSchema,
					TicketCategoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCategoryFindManyArgsSchema: z.ZodType<Prisma.TicketCategoryFindManyArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCategoryOrderByWithRelationInputSchema.array(),
					TicketCategoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCategoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCategoryScalarFieldEnumSchema,
					TicketCategoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCategoryAggregateArgsSchema: z.ZodType<Prisma.TicketCategoryAggregateArgs> =
	z
		.object({
			where: TicketCategoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCategoryOrderByWithRelationInputSchema.array(),
					TicketCategoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCategoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketCategoryGroupByArgsSchema: z.ZodType<Prisma.TicketCategoryGroupByArgs> =
	z
		.object({
			where: TicketCategoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCategoryOrderByWithAggregationInputSchema.array(),
					TicketCategoryOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: TicketCategoryScalarFieldEnumSchema.array(),
			having: TicketCategoryScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketCategoryFindUniqueArgsSchema: z.ZodType<Prisma.TicketCategoryFindUniqueArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketCategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketCategoryFindUniqueOrThrowArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketFindFirstArgsSchema: z.ZodType<Prisma.TicketFindFirstArgs> =
	z
		.object({
			select: TicketSelectSchema.optional(),
			include: TicketIncludeSchema.optional(),
			where: TicketWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketOrderByWithRelationInputSchema.array(),
					TicketOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketScalarFieldEnumSchema,
					TicketScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketFindFirstOrThrowArgs> =
	z
		.object({
			select: TicketSelectSchema.optional(),
			include: TicketIncludeSchema.optional(),
			where: TicketWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketOrderByWithRelationInputSchema.array(),
					TicketOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketScalarFieldEnumSchema,
					TicketScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketFindManyArgsSchema: z.ZodType<Prisma.TicketFindManyArgs> = z
	.object({
		select: TicketSelectSchema.optional(),
		include: TicketIncludeSchema.optional(),
		where: TicketWhereInputSchema.optional(),
		orderBy: z
			.union([
				TicketOrderByWithRelationInputSchema.array(),
				TicketOrderByWithRelationInputSchema,
			])
			.optional(),
		cursor: TicketWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([TicketScalarFieldEnumSchema, TicketScalarFieldEnumSchema.array()])
			.optional(),
	})
	.strict();

export const TicketAggregateArgsSchema: z.ZodType<Prisma.TicketAggregateArgs> =
	z
		.object({
			where: TicketWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketOrderByWithRelationInputSchema.array(),
					TicketOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketGroupByArgsSchema: z.ZodType<Prisma.TicketGroupByArgs> = z
	.object({
		where: TicketWhereInputSchema.optional(),
		orderBy: z
			.union([
				TicketOrderByWithAggregationInputSchema.array(),
				TicketOrderByWithAggregationInputSchema,
			])
			.optional(),
		by: TicketScalarFieldEnumSchema.array(),
		having: TicketScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
	})
	.strict();

export const TicketFindUniqueArgsSchema: z.ZodType<Prisma.TicketFindUniqueArgs> =
	z
		.object({
			select: TicketSelectSchema.optional(),
			include: TicketIncludeSchema.optional(),
			where: TicketWhereUniqueInputSchema,
		})
		.strict();

export const TicketFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketFindUniqueOrThrowArgs> =
	z
		.object({
			select: TicketSelectSchema.optional(),
			include: TicketIncludeSchema.optional(),
			where: TicketWhereUniqueInputSchema,
		})
		.strict();

export const AttachmentFindFirstArgsSchema: z.ZodType<Prisma.AttachmentFindFirstArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AttachmentOrderByWithRelationInputSchema.array(),
					AttachmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AttachmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AttachmentScalarFieldEnumSchema,
					AttachmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AttachmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AttachmentFindFirstOrThrowArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AttachmentOrderByWithRelationInputSchema.array(),
					AttachmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AttachmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AttachmentScalarFieldEnumSchema,
					AttachmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AttachmentFindManyArgsSchema: z.ZodType<Prisma.AttachmentFindManyArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AttachmentOrderByWithRelationInputSchema.array(),
					AttachmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AttachmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					AttachmentScalarFieldEnumSchema,
					AttachmentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const AttachmentAggregateArgsSchema: z.ZodType<Prisma.AttachmentAggregateArgs> =
	z
		.object({
			where: AttachmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AttachmentOrderByWithRelationInputSchema.array(),
					AttachmentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: AttachmentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const AttachmentGroupByArgsSchema: z.ZodType<Prisma.AttachmentGroupByArgs> =
	z
		.object({
			where: AttachmentWhereInputSchema.optional(),
			orderBy: z
				.union([
					AttachmentOrderByWithAggregationInputSchema.array(),
					AttachmentOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: AttachmentScalarFieldEnumSchema.array(),
			having: AttachmentScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const AttachmentFindUniqueArgsSchema: z.ZodType<Prisma.AttachmentFindUniqueArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereUniqueInputSchema,
		})
		.strict();

export const AttachmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AttachmentFindUniqueOrThrowArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereUniqueInputSchema,
		})
		.strict();

export const TicketCommentFindFirstArgsSchema: z.ZodType<Prisma.TicketCommentFindFirstArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCommentOrderByWithRelationInputSchema.array(),
					TicketCommentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCommentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCommentScalarFieldEnumSchema,
					TicketCommentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCommentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketCommentFindFirstOrThrowArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCommentOrderByWithRelationInputSchema.array(),
					TicketCommentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCommentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCommentScalarFieldEnumSchema,
					TicketCommentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCommentFindManyArgsSchema: z.ZodType<Prisma.TicketCommentFindManyArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCommentOrderByWithRelationInputSchema.array(),
					TicketCommentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCommentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketCommentScalarFieldEnumSchema,
					TicketCommentScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketCommentAggregateArgsSchema: z.ZodType<Prisma.TicketCommentAggregateArgs> =
	z
		.object({
			where: TicketCommentWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCommentOrderByWithRelationInputSchema.array(),
					TicketCommentOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketCommentWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketCommentGroupByArgsSchema: z.ZodType<Prisma.TicketCommentGroupByArgs> =
	z
		.object({
			where: TicketCommentWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketCommentOrderByWithAggregationInputSchema.array(),
					TicketCommentOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: TicketCommentScalarFieldEnumSchema.array(),
			having: TicketCommentScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketCommentFindUniqueArgsSchema: z.ZodType<Prisma.TicketCommentFindUniqueArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereUniqueInputSchema,
		})
		.strict();

export const TicketCommentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketCommentFindUniqueOrThrowArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereUniqueInputSchema,
		})
		.strict();

export const TicketHistoryFindFirstArgsSchema: z.ZodType<Prisma.TicketHistoryFindFirstArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketHistoryOrderByWithRelationInputSchema.array(),
					TicketHistoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketHistoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketHistoryScalarFieldEnumSchema,
					TicketHistoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketHistoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketHistoryFindFirstOrThrowArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketHistoryOrderByWithRelationInputSchema.array(),
					TicketHistoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketHistoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketHistoryScalarFieldEnumSchema,
					TicketHistoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketHistoryFindManyArgsSchema: z.ZodType<Prisma.TicketHistoryFindManyArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketHistoryOrderByWithRelationInputSchema.array(),
					TicketHistoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketHistoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					TicketHistoryScalarFieldEnumSchema,
					TicketHistoryScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const TicketHistoryAggregateArgsSchema: z.ZodType<Prisma.TicketHistoryAggregateArgs> =
	z
		.object({
			where: TicketHistoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketHistoryOrderByWithRelationInputSchema.array(),
					TicketHistoryOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: TicketHistoryWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketHistoryGroupByArgsSchema: z.ZodType<Prisma.TicketHistoryGroupByArgs> =
	z
		.object({
			where: TicketHistoryWhereInputSchema.optional(),
			orderBy: z
				.union([
					TicketHistoryOrderByWithAggregationInputSchema.array(),
					TicketHistoryOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: TicketHistoryScalarFieldEnumSchema.array(),
			having: TicketHistoryScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const TicketHistoryFindUniqueArgsSchema: z.ZodType<Prisma.TicketHistoryFindUniqueArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketHistoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketHistoryFindUniqueOrThrowArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereUniqueInputSchema,
		})
		.strict();

export const NotificationFindFirstArgsSchema: z.ZodType<Prisma.NotificationFindFirstArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereInputSchema.optional(),
			orderBy: z
				.union([
					NotificationOrderByWithRelationInputSchema.array(),
					NotificationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: NotificationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					NotificationScalarFieldEnumSchema,
					NotificationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const NotificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindFirstOrThrowArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereInputSchema.optional(),
			orderBy: z
				.union([
					NotificationOrderByWithRelationInputSchema.array(),
					NotificationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: NotificationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					NotificationScalarFieldEnumSchema,
					NotificationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const NotificationFindManyArgsSchema: z.ZodType<Prisma.NotificationFindManyArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereInputSchema.optional(),
			orderBy: z
				.union([
					NotificationOrderByWithRelationInputSchema.array(),
					NotificationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: NotificationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					NotificationScalarFieldEnumSchema,
					NotificationScalarFieldEnumSchema.array(),
				])
				.optional(),
		})
		.strict();

export const NotificationAggregateArgsSchema: z.ZodType<Prisma.NotificationAggregateArgs> =
	z
		.object({
			where: NotificationWhereInputSchema.optional(),
			orderBy: z
				.union([
					NotificationOrderByWithRelationInputSchema.array(),
					NotificationOrderByWithRelationInputSchema,
				])
				.optional(),
			cursor: NotificationWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const NotificationGroupByArgsSchema: z.ZodType<Prisma.NotificationGroupByArgs> =
	z
		.object({
			where: NotificationWhereInputSchema.optional(),
			orderBy: z
				.union([
					NotificationOrderByWithAggregationInputSchema.array(),
					NotificationOrderByWithAggregationInputSchema,
				])
				.optional(),
			by: NotificationScalarFieldEnumSchema.array(),
			having: NotificationScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
		})
		.strict();

export const NotificationFindUniqueArgsSchema: z.ZodType<Prisma.NotificationFindUniqueArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereUniqueInputSchema,
		})
		.strict();

export const NotificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.NotificationFindUniqueOrThrowArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereUniqueInputSchema,
		})
		.strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
	})
	.strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
		create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
		update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
	})
	.strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
	.object({
		data: z.union([
			UserCreateManyInputSchema,
			UserCreateManyInputSchema.array(),
		]),
		skipDuplicates: z.boolean().optional(),
	})
	.strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				UserCreateManyInputSchema,
				UserCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
		where: UserWhereUniqueInputSchema,
	})
	.strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
	.object({
		data: z.union([
			UserUpdateManyMutationInputSchema,
			UserUncheckedUpdateManyInputSchema,
		]),
		where: UserWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				UserUpdateManyMutationInputSchema,
				UserUncheckedUpdateManyInputSchema,
			]),
			where: UserWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		limit: z.number().optional(),
	})
	.strict();

export const TechSupportCreateArgsSchema: z.ZodType<Prisma.TechSupportCreateArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			data: z.union([
				TechSupportCreateInputSchema,
				TechSupportUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const TechSupportUpsertArgsSchema: z.ZodType<Prisma.TechSupportUpsertArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereUniqueInputSchema,
			create: z.union([
				TechSupportCreateInputSchema,
				TechSupportUncheckedCreateInputSchema,
			]),
			update: z.union([
				TechSupportUpdateInputSchema,
				TechSupportUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const TechSupportCreateManyArgsSchema: z.ZodType<Prisma.TechSupportCreateManyArgs> =
	z
		.object({
			data: z.union([
				TechSupportCreateManyInputSchema,
				TechSupportCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TechSupportCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TechSupportCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TechSupportCreateManyInputSchema,
				TechSupportCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TechSupportDeleteArgsSchema: z.ZodType<Prisma.TechSupportDeleteArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			where: TechSupportWhereUniqueInputSchema,
		})
		.strict();

export const TechSupportUpdateArgsSchema: z.ZodType<Prisma.TechSupportUpdateArgs> =
	z
		.object({
			select: TechSupportSelectSchema.optional(),
			include: TechSupportIncludeSchema.optional(),
			data: z.union([
				TechSupportUpdateInputSchema,
				TechSupportUncheckedUpdateInputSchema,
			]),
			where: TechSupportWhereUniqueInputSchema,
		})
		.strict();

export const TechSupportUpdateManyArgsSchema: z.ZodType<Prisma.TechSupportUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TechSupportUpdateManyMutationInputSchema,
				TechSupportUncheckedUpdateManyInputSchema,
			]),
			where: TechSupportWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TechSupportUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TechSupportUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TechSupportUpdateManyMutationInputSchema,
				TechSupportUncheckedUpdateManyInputSchema,
			]),
			where: TechSupportWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TechSupportDeleteManyArgsSchema: z.ZodType<Prisma.TechSupportDeleteManyArgs> =
	z
		.object({
			where: TechSupportWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const PasswordResetTokenCreateArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			data: z.union([
				PasswordResetTokenCreateInputSchema,
				PasswordResetTokenUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const PasswordResetTokenUpsertArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpsertArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereUniqueInputSchema,
			create: z.union([
				PasswordResetTokenCreateInputSchema,
				PasswordResetTokenUncheckedCreateInputSchema,
			]),
			update: z.union([
				PasswordResetTokenUpdateInputSchema,
				PasswordResetTokenUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const PasswordResetTokenCreateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyArgs> =
	z
		.object({
			data: z.union([
				PasswordResetTokenCreateManyInputSchema,
				PasswordResetTokenCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PasswordResetTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PasswordResetTokenCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				PasswordResetTokenCreateManyInputSchema,
				PasswordResetTokenCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const PasswordResetTokenDeleteArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			where: PasswordResetTokenWhereUniqueInputSchema,
		})
		.strict();

export const PasswordResetTokenUpdateArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateArgs> =
	z
		.object({
			select: PasswordResetTokenSelectSchema.optional(),
			include: PasswordResetTokenIncludeSchema.optional(),
			data: z.union([
				PasswordResetTokenUpdateInputSchema,
				PasswordResetTokenUncheckedUpdateInputSchema,
			]),
			where: PasswordResetTokenWhereUniqueInputSchema,
		})
		.strict();

export const PasswordResetTokenUpdateManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyArgs> =
	z
		.object({
			data: z.union([
				PasswordResetTokenUpdateManyMutationInputSchema,
				PasswordResetTokenUncheckedUpdateManyInputSchema,
			]),
			where: PasswordResetTokenWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const PasswordResetTokenUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PasswordResetTokenUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				PasswordResetTokenUpdateManyMutationInputSchema,
				PasswordResetTokenUncheckedUpdateManyInputSchema,
			]),
			where: PasswordResetTokenWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const PasswordResetTokenDeleteManyArgsSchema: z.ZodType<Prisma.PasswordResetTokenDeleteManyArgs> =
	z
		.object({
			where: PasswordResetTokenWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCategoryCreateArgsSchema: z.ZodType<Prisma.TicketCategoryCreateArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			data: z.union([
				TicketCategoryCreateInputSchema,
				TicketCategoryUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const TicketCategoryUpsertArgsSchema: z.ZodType<Prisma.TicketCategoryUpsertArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereUniqueInputSchema,
			create: z.union([
				TicketCategoryCreateInputSchema,
				TicketCategoryUncheckedCreateInputSchema,
			]),
			update: z.union([
				TicketCategoryUpdateInputSchema,
				TicketCategoryUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const TicketCategoryCreateManyArgsSchema: z.ZodType<Prisma.TicketCategoryCreateManyArgs> =
	z
		.object({
			data: z.union([
				TicketCategoryCreateManyInputSchema,
				TicketCategoryCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketCategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketCategoryCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketCategoryCreateManyInputSchema,
				TicketCategoryCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketCategoryDeleteArgsSchema: z.ZodType<Prisma.TicketCategoryDeleteArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			where: TicketCategoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketCategoryUpdateArgsSchema: z.ZodType<Prisma.TicketCategoryUpdateArgs> =
	z
		.object({
			select: TicketCategorySelectSchema.optional(),
			include: TicketCategoryIncludeSchema.optional(),
			data: z.union([
				TicketCategoryUpdateInputSchema,
				TicketCategoryUncheckedUpdateInputSchema,
			]),
			where: TicketCategoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketCategoryUpdateManyArgsSchema: z.ZodType<Prisma.TicketCategoryUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TicketCategoryUpdateManyMutationInputSchema,
				TicketCategoryUncheckedUpdateManyInputSchema,
			]),
			where: TicketCategoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketCategoryUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketCategoryUpdateManyMutationInputSchema,
				TicketCategoryUncheckedUpdateManyInputSchema,
			]),
			where: TicketCategoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCategoryDeleteManyArgsSchema: z.ZodType<Prisma.TicketCategoryDeleteManyArgs> =
	z
		.object({
			where: TicketCategoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCreateArgsSchema: z.ZodType<Prisma.TicketCreateArgs> = z
	.object({
		select: TicketSelectSchema.optional(),
		include: TicketIncludeSchema.optional(),
		data: z.union([TicketCreateInputSchema, TicketUncheckedCreateInputSchema]),
	})
	.strict();

export const TicketUpsertArgsSchema: z.ZodType<Prisma.TicketUpsertArgs> = z
	.object({
		select: TicketSelectSchema.optional(),
		include: TicketIncludeSchema.optional(),
		where: TicketWhereUniqueInputSchema,
		create: z.union([
			TicketCreateInputSchema,
			TicketUncheckedCreateInputSchema,
		]),
		update: z.union([
			TicketUpdateInputSchema,
			TicketUncheckedUpdateInputSchema,
		]),
	})
	.strict();

export const TicketCreateManyArgsSchema: z.ZodType<Prisma.TicketCreateManyArgs> =
	z
		.object({
			data: z.union([
				TicketCreateManyInputSchema,
				TicketCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketCreateManyInputSchema,
				TicketCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketDeleteArgsSchema: z.ZodType<Prisma.TicketDeleteArgs> = z
	.object({
		select: TicketSelectSchema.optional(),
		include: TicketIncludeSchema.optional(),
		where: TicketWhereUniqueInputSchema,
	})
	.strict();

export const TicketUpdateArgsSchema: z.ZodType<Prisma.TicketUpdateArgs> = z
	.object({
		select: TicketSelectSchema.optional(),
		include: TicketIncludeSchema.optional(),
		data: z.union([TicketUpdateInputSchema, TicketUncheckedUpdateInputSchema]),
		where: TicketWhereUniqueInputSchema,
	})
	.strict();

export const TicketUpdateManyArgsSchema: z.ZodType<Prisma.TicketUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TicketUpdateManyMutationInputSchema,
				TicketUncheckedUpdateManyInputSchema,
			]),
			where: TicketWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketUpdateManyMutationInputSchema,
				TicketUncheckedUpdateManyInputSchema,
			]),
			where: TicketWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketDeleteManyArgsSchema: z.ZodType<Prisma.TicketDeleteManyArgs> =
	z
		.object({
			where: TicketWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const AttachmentCreateArgsSchema: z.ZodType<Prisma.AttachmentCreateArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			data: z.union([
				AttachmentCreateInputSchema,
				AttachmentUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const AttachmentUpsertArgsSchema: z.ZodType<Prisma.AttachmentUpsertArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereUniqueInputSchema,
			create: z.union([
				AttachmentCreateInputSchema,
				AttachmentUncheckedCreateInputSchema,
			]),
			update: z.union([
				AttachmentUpdateInputSchema,
				AttachmentUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const AttachmentCreateManyArgsSchema: z.ZodType<Prisma.AttachmentCreateManyArgs> =
	z
		.object({
			data: z.union([
				AttachmentCreateManyInputSchema,
				AttachmentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AttachmentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AttachmentCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				AttachmentCreateManyInputSchema,
				AttachmentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const AttachmentDeleteArgsSchema: z.ZodType<Prisma.AttachmentDeleteArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			where: AttachmentWhereUniqueInputSchema,
		})
		.strict();

export const AttachmentUpdateArgsSchema: z.ZodType<Prisma.AttachmentUpdateArgs> =
	z
		.object({
			select: AttachmentSelectSchema.optional(),
			include: AttachmentIncludeSchema.optional(),
			data: z.union([
				AttachmentUpdateInputSchema,
				AttachmentUncheckedUpdateInputSchema,
			]),
			where: AttachmentWhereUniqueInputSchema,
		})
		.strict();

export const AttachmentUpdateManyArgsSchema: z.ZodType<Prisma.AttachmentUpdateManyArgs> =
	z
		.object({
			data: z.union([
				AttachmentUpdateManyMutationInputSchema,
				AttachmentUncheckedUpdateManyInputSchema,
			]),
			where: AttachmentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const AttachmentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AttachmentUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				AttachmentUpdateManyMutationInputSchema,
				AttachmentUncheckedUpdateManyInputSchema,
			]),
			where: AttachmentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const AttachmentDeleteManyArgsSchema: z.ZodType<Prisma.AttachmentDeleteManyArgs> =
	z
		.object({
			where: AttachmentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCommentCreateArgsSchema: z.ZodType<Prisma.TicketCommentCreateArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			data: z.union([
				TicketCommentCreateInputSchema,
				TicketCommentUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const TicketCommentUpsertArgsSchema: z.ZodType<Prisma.TicketCommentUpsertArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereUniqueInputSchema,
			create: z.union([
				TicketCommentCreateInputSchema,
				TicketCommentUncheckedCreateInputSchema,
			]),
			update: z.union([
				TicketCommentUpdateInputSchema,
				TicketCommentUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const TicketCommentCreateManyArgsSchema: z.ZodType<Prisma.TicketCommentCreateManyArgs> =
	z
		.object({
			data: z.union([
				TicketCommentCreateManyInputSchema,
				TicketCommentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketCommentCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketCommentCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketCommentCreateManyInputSchema,
				TicketCommentCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketCommentDeleteArgsSchema: z.ZodType<Prisma.TicketCommentDeleteArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			where: TicketCommentWhereUniqueInputSchema,
		})
		.strict();

export const TicketCommentUpdateArgsSchema: z.ZodType<Prisma.TicketCommentUpdateArgs> =
	z
		.object({
			select: TicketCommentSelectSchema.optional(),
			include: TicketCommentIncludeSchema.optional(),
			data: z.union([
				TicketCommentUpdateInputSchema,
				TicketCommentUncheckedUpdateInputSchema,
			]),
			where: TicketCommentWhereUniqueInputSchema,
		})
		.strict();

export const TicketCommentUpdateManyArgsSchema: z.ZodType<Prisma.TicketCommentUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TicketCommentUpdateManyMutationInputSchema,
				TicketCommentUncheckedUpdateManyInputSchema,
			]),
			where: TicketCommentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCommentUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketCommentUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketCommentUpdateManyMutationInputSchema,
				TicketCommentUncheckedUpdateManyInputSchema,
			]),
			where: TicketCommentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketCommentDeleteManyArgsSchema: z.ZodType<Prisma.TicketCommentDeleteManyArgs> =
	z
		.object({
			where: TicketCommentWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketHistoryCreateArgsSchema: z.ZodType<Prisma.TicketHistoryCreateArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			data: z.union([
				TicketHistoryCreateInputSchema,
				TicketHistoryUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const TicketHistoryUpsertArgsSchema: z.ZodType<Prisma.TicketHistoryUpsertArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereUniqueInputSchema,
			create: z.union([
				TicketHistoryCreateInputSchema,
				TicketHistoryUncheckedCreateInputSchema,
			]),
			update: z.union([
				TicketHistoryUpdateInputSchema,
				TicketHistoryUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const TicketHistoryCreateManyArgsSchema: z.ZodType<Prisma.TicketHistoryCreateManyArgs> =
	z
		.object({
			data: z.union([
				TicketHistoryCreateManyInputSchema,
				TicketHistoryCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketHistoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketHistoryCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketHistoryCreateManyInputSchema,
				TicketHistoryCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const TicketHistoryDeleteArgsSchema: z.ZodType<Prisma.TicketHistoryDeleteArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			where: TicketHistoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketHistoryUpdateArgsSchema: z.ZodType<Prisma.TicketHistoryUpdateArgs> =
	z
		.object({
			select: TicketHistorySelectSchema.optional(),
			include: TicketHistoryIncludeSchema.optional(),
			data: z.union([
				TicketHistoryUpdateInputSchema,
				TicketHistoryUncheckedUpdateInputSchema,
			]),
			where: TicketHistoryWhereUniqueInputSchema,
		})
		.strict();

export const TicketHistoryUpdateManyArgsSchema: z.ZodType<Prisma.TicketHistoryUpdateManyArgs> =
	z
		.object({
			data: z.union([
				TicketHistoryUpdateManyMutationInputSchema,
				TicketHistoryUncheckedUpdateManyInputSchema,
			]),
			where: TicketHistoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketHistoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.TicketHistoryUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				TicketHistoryUpdateManyMutationInputSchema,
				TicketHistoryUncheckedUpdateManyInputSchema,
			]),
			where: TicketHistoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const TicketHistoryDeleteManyArgsSchema: z.ZodType<Prisma.TicketHistoryDeleteManyArgs> =
	z
		.object({
			where: TicketHistoryWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const NotificationCreateArgsSchema: z.ZodType<Prisma.NotificationCreateArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			data: z.union([
				NotificationCreateInputSchema,
				NotificationUncheckedCreateInputSchema,
			]),
		})
		.strict();

export const NotificationUpsertArgsSchema: z.ZodType<Prisma.NotificationUpsertArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereUniqueInputSchema,
			create: z.union([
				NotificationCreateInputSchema,
				NotificationUncheckedCreateInputSchema,
			]),
			update: z.union([
				NotificationUpdateInputSchema,
				NotificationUncheckedUpdateInputSchema,
			]),
		})
		.strict();

export const NotificationCreateManyArgsSchema: z.ZodType<Prisma.NotificationCreateManyArgs> =
	z
		.object({
			data: z.union([
				NotificationCreateManyInputSchema,
				NotificationCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const NotificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationCreateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				NotificationCreateManyInputSchema,
				NotificationCreateManyInputSchema.array(),
			]),
			skipDuplicates: z.boolean().optional(),
		})
		.strict();

export const NotificationDeleteArgsSchema: z.ZodType<Prisma.NotificationDeleteArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			where: NotificationWhereUniqueInputSchema,
		})
		.strict();

export const NotificationUpdateArgsSchema: z.ZodType<Prisma.NotificationUpdateArgs> =
	z
		.object({
			select: NotificationSelectSchema.optional(),
			include: NotificationIncludeSchema.optional(),
			data: z.union([
				NotificationUpdateInputSchema,
				NotificationUncheckedUpdateInputSchema,
			]),
			where: NotificationWhereUniqueInputSchema,
		})
		.strict();

export const NotificationUpdateManyArgsSchema: z.ZodType<Prisma.NotificationUpdateManyArgs> =
	z
		.object({
			data: z.union([
				NotificationUpdateManyMutationInputSchema,
				NotificationUncheckedUpdateManyInputSchema,
			]),
			where: NotificationWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const NotificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.NotificationUpdateManyAndReturnArgs> =
	z
		.object({
			data: z.union([
				NotificationUpdateManyMutationInputSchema,
				NotificationUncheckedUpdateManyInputSchema,
			]),
			where: NotificationWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();

export const NotificationDeleteManyArgsSchema: z.ZodType<Prisma.NotificationDeleteManyArgs> =
	z
		.object({
			where: NotificationWhereInputSchema.optional(),
			limit: z.number().optional(),
		})
		.strict();
