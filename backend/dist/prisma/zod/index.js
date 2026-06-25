import { z } from 'zod';
/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////
/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////
export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted', 'ReadCommitted', 'RepeatableRead', 'Serializable']);
export const UserScalarFieldEnumSchema = z.enum(['id', 'supabaseUid', 'username', 'email', 'passwordHash', 'role', 'fullName', 'avatarUrl', 'phone', 'isActive', 'createdAt', 'updatedAt', 'lastLoginAt']);
export const TechSupportScalarFieldEnumSchema = z.enum(['id', 'userId', 'createdAt', 'updatedAt', 'speciality']);
export const PasswordResetTokenScalarFieldEnumSchema = z.enum(['id', 'token', 'userId', 'expiresAt', 'usedAt', 'createdAt']);
export const TicketCategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'description', 'createdAt']);
export const TicketScalarFieldEnumSchema = z.enum(['id', 'title', 'description', 'status', 'priority', 'createdAt', 'updatedAt', 'resolvedAt', 'closedAt', 'creatorId', 'assigneeId', 'categoryId', 'techSupportId']);
export const AttachmentScalarFieldEnumSchema = z.enum(['id', 'ticketId', 'fileName', 'fileUrl', 'fileSize', 'mimeType', 'source', 'uploadedAt']);
export const TicketCommentScalarFieldEnumSchema = z.enum(['id', 'ticketId', 'authorId', 'body', 'createdAt', 'updatedAt']);
export const TicketHistoryScalarFieldEnumSchema = z.enum(['id', 'ticketId', 'changedById', 'field', 'oldValue', 'newValue', 'note', 'createdAt']);
export const NotificationScalarFieldEnumSchema = z.enum(['id', 'userId', 'ticketId', 'type', 'title', 'body', 'isRead', 'readAt', 'createdAt']);
export const SortOrderSchema = z.enum(['asc', 'desc']);
export const QueryModeSchema = z.enum(['default', 'insensitive']);
export const NullsOrderSchema = z.enum(['first', 'last']);
export const UserRoleSchema = z.enum(['USER', 'HELPDESK', 'ADMIN', 'TECHSUPPORT']);
export const TicketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED']);
export const TechSupportSpecialtySchema = z.enum(['NETWORK', 'HARDWARE', 'SOFTWARE', 'ACCOUNT_AUTH', 'INFRASTRUCTURE']);
export const TicketPrioritySchema = z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
export const NotificationTypeSchema = z.enum(['TICKET_CREATED', 'TICKET_ASSIGNED', 'TICKET_STATUS_UPDATED', 'TICKET_COMMENT_ADDED', 'TICKET_RESOLVED', 'TICKET_CLOSED']);
export const AttachmentSourceSchema = z.enum(['UPLOAD', 'CAMERA']);
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
/////////////////////////////////////////
// TICKET CATEGORY SCHEMA
/////////////////////////////////////////
export const TicketCategorySchema = z.object({
    id: z.uuid(),
    name: z.string(),
    description: z.string().nullable(),
    createdAt: z.coerce.date(),
});
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
/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////
// USER
//------------------------------------------------------
export const UserIncludeSchema = z.object({
    passwordResetTokens: z.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManyArgsSchema)]).optional(),
    ticketsCreated: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    ticketsAssignedTo: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    comments: z.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)]).optional(),
    ticketHistories: z.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)]).optional(),
    notifications: z.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
    techSupports: z.union([z.boolean(), z.lazy(() => TechSupportFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const UserArgsSchema = z.object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();
export const UserCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();
export const UserCountOutputTypeSelectSchema = z.object({
    passwordResetTokens: z.boolean().optional(),
    ticketsCreated: z.boolean().optional(),
    ticketsAssignedTo: z.boolean().optional(),
    comments: z.boolean().optional(),
    ticketHistories: z.boolean().optional(),
    notifications: z.boolean().optional(),
    techSupports: z.boolean().optional(),
}).strict();
export const UserSelectSchema = z.object({
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
    passwordResetTokens: z.union([z.boolean(), z.lazy(() => PasswordResetTokenFindManyArgsSchema)]).optional(),
    ticketsCreated: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    ticketsAssignedTo: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    comments: z.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)]).optional(),
    ticketHistories: z.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)]).optional(),
    notifications: z.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
    techSupports: z.union([z.boolean(), z.lazy(() => TechSupportFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();
// TECH SUPPORT
//------------------------------------------------------
export const TechSupportIncludeSchema = z.object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    tickets: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TechSupportCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const TechSupportArgsSchema = z.object({
    select: z.lazy(() => TechSupportSelectSchema).optional(),
    include: z.lazy(() => TechSupportIncludeSchema).optional(),
}).strict();
export const TechSupportCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => TechSupportCountOutputTypeSelectSchema).nullish(),
}).strict();
export const TechSupportCountOutputTypeSelectSchema = z.object({
    tickets: z.boolean().optional(),
}).strict();
export const TechSupportSelectSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    speciality: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    tickets: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TechSupportCountOutputTypeArgsSchema)]).optional(),
}).strict();
// PASSWORD RESET TOKEN
//------------------------------------------------------
export const PasswordResetTokenIncludeSchema = z.object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
export const PasswordResetTokenArgsSchema = z.object({
    select: z.lazy(() => PasswordResetTokenSelectSchema).optional(),
    include: z.lazy(() => PasswordResetTokenIncludeSchema).optional(),
}).strict();
export const PasswordResetTokenSelectSchema = z.object({
    id: z.boolean().optional(),
    token: z.boolean().optional(),
    userId: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    usedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
// TICKET CATEGORY
//------------------------------------------------------
export const TicketCategoryIncludeSchema = z.object({
    tickets: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TicketCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const TicketCategoryArgsSchema = z.object({
    select: z.lazy(() => TicketCategorySelectSchema).optional(),
    include: z.lazy(() => TicketCategoryIncludeSchema).optional(),
}).strict();
export const TicketCategoryCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => TicketCategoryCountOutputTypeSelectSchema).nullish(),
}).strict();
export const TicketCategoryCountOutputTypeSelectSchema = z.object({
    tickets: z.boolean().optional(),
}).strict();
export const TicketCategorySelectSchema = z.object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    description: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    tickets: z.union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TicketCategoryCountOutputTypeArgsSchema)]).optional(),
}).strict();
// TICKET
//------------------------------------------------------
export const TicketIncludeSchema = z.object({
    creator: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    assignee: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    category: z.union([z.boolean(), z.lazy(() => TicketCategoryArgsSchema)]).optional(),
    attachments: z.union([z.boolean(), z.lazy(() => AttachmentFindManyArgsSchema)]).optional(),
    comments: z.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)]).optional(),
    histories: z.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)]).optional(),
    notifications: z.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
    techSupport: z.union([z.boolean(), z.lazy(() => TechSupportArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TicketCountOutputTypeArgsSchema)]).optional(),
}).strict();
export const TicketArgsSchema = z.object({
    select: z.lazy(() => TicketSelectSchema).optional(),
    include: z.lazy(() => TicketIncludeSchema).optional(),
}).strict();
export const TicketCountOutputTypeArgsSchema = z.object({
    select: z.lazy(() => TicketCountOutputTypeSelectSchema).nullish(),
}).strict();
export const TicketCountOutputTypeSelectSchema = z.object({
    attachments: z.boolean().optional(),
    comments: z.boolean().optional(),
    histories: z.boolean().optional(),
    notifications: z.boolean().optional(),
}).strict();
export const TicketSelectSchema = z.object({
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
    category: z.union([z.boolean(), z.lazy(() => TicketCategoryArgsSchema)]).optional(),
    attachments: z.union([z.boolean(), z.lazy(() => AttachmentFindManyArgsSchema)]).optional(),
    comments: z.union([z.boolean(), z.lazy(() => TicketCommentFindManyArgsSchema)]).optional(),
    histories: z.union([z.boolean(), z.lazy(() => TicketHistoryFindManyArgsSchema)]).optional(),
    notifications: z.union([z.boolean(), z.lazy(() => NotificationFindManyArgsSchema)]).optional(),
    techSupport: z.union([z.boolean(), z.lazy(() => TechSupportArgsSchema)]).optional(),
    _count: z.union([z.boolean(), z.lazy(() => TicketCountOutputTypeArgsSchema)]).optional(),
}).strict();
// ATTACHMENT
//------------------------------------------------------
export const AttachmentIncludeSchema = z.object({
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
}).strict();
export const AttachmentArgsSchema = z.object({
    select: z.lazy(() => AttachmentSelectSchema).optional(),
    include: z.lazy(() => AttachmentIncludeSchema).optional(),
}).strict();
export const AttachmentSelectSchema = z.object({
    id: z.boolean().optional(),
    ticketId: z.boolean().optional(),
    fileName: z.boolean().optional(),
    fileUrl: z.boolean().optional(),
    fileSize: z.boolean().optional(),
    mimeType: z.boolean().optional(),
    source: z.boolean().optional(),
    uploadedAt: z.boolean().optional(),
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
}).strict();
// TICKET COMMENT
//------------------------------------------------------
export const TicketCommentIncludeSchema = z.object({
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
export const TicketCommentArgsSchema = z.object({
    select: z.lazy(() => TicketCommentSelectSchema).optional(),
    include: z.lazy(() => TicketCommentIncludeSchema).optional(),
}).strict();
export const TicketCommentSelectSchema = z.object({
    id: z.boolean().optional(),
    ticketId: z.boolean().optional(),
    authorId: z.boolean().optional(),
    body: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
// TICKET HISTORY
//------------------------------------------------------
export const TicketHistoryIncludeSchema = z.object({
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
    changedBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
export const TicketHistoryArgsSchema = z.object({
    select: z.lazy(() => TicketHistorySelectSchema).optional(),
    include: z.lazy(() => TicketHistoryIncludeSchema).optional(),
}).strict();
export const TicketHistorySelectSchema = z.object({
    id: z.boolean().optional(),
    ticketId: z.boolean().optional(),
    changedById: z.boolean().optional(),
    field: z.boolean().optional(),
    oldValue: z.boolean().optional(),
    newValue: z.boolean().optional(),
    note: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
    changedBy: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
}).strict();
// NOTIFICATION
//------------------------------------------------------
export const NotificationIncludeSchema = z.object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    ticket: z.union([z.boolean(), z.lazy(() => TicketArgsSchema)]).optional(),
}).strict();
export const NotificationArgsSchema = z.object({
    select: z.lazy(() => NotificationSelectSchema).optional(),
    include: z.lazy(() => NotificationIncludeSchema).optional(),
}).strict();
export const NotificationSelectSchema = z.object({
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
}).strict();
/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////
export const UserWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => UserWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    supabaseUid: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    username: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    passwordHash: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    role: z.union([z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema)]).optional(),
    fullName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    avatarUrl: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    phone: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    lastLoginAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenListRelationFilterSchema).optional(),
    ticketsCreated: z.lazy(() => TicketListRelationFilterSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketListRelationFilterSchema).optional(),
    comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryListRelationFilterSchema).optional(),
    notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
    techSupports: z.lazy(() => TechSupportListRelationFilterSchema).optional(),
});
export const UserOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    supabaseUid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    fullName: z.lazy(() => SortOrderSchema).optional(),
    avatarUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    phone: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    lastLoginAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenOrderByRelationAggregateInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
    comments: z.lazy(() => TicketCommentOrderByRelationAggregateInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryOrderByRelationAggregateInputSchema).optional(),
    notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportOrderByRelationAggregateInputSchema).optional(),
});
export const UserWhereUniqueInputSchema = z.union([
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
    .and(z.strictObject({
    id: z.uuid().optional(),
    supabaseUid: z.string().optional(),
    username: z.string().optional(),
    email: z.string().optional(),
    AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => UserWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
    passwordHash: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    role: z.union([z.lazy(() => EnumUserRoleFilterSchema), z.lazy(() => UserRoleSchema)]).optional(),
    fullName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    avatarUrl: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    phone: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    isActive: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    lastLoginAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenListRelationFilterSchema).optional(),
    ticketsCreated: z.lazy(() => TicketListRelationFilterSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketListRelationFilterSchema).optional(),
    comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryListRelationFilterSchema).optional(),
    notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
    techSupports: z.lazy(() => TechSupportListRelationFilterSchema).optional(),
}));
export const UserOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    supabaseUid: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    username: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    passwordHash: z.lazy(() => SortOrderSchema).optional(),
    role: z.lazy(() => SortOrderSchema).optional(),
    fullName: z.lazy(() => SortOrderSchema).optional(),
    avatarUrl: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    phone: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    isActive: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    lastLoginAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});
export const UserScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    supabaseUid: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    username: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    passwordHash: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    role: z.union([z.lazy(() => EnumUserRoleWithAggregatesFilterSchema), z.lazy(() => UserRoleSchema)]).optional(),
    fullName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    avatarUrl: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    phone: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    isActive: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    lastLoginAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
});
export const TechSupportWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TechSupportWhereInputSchema), z.lazy(() => TechSupportWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TechSupportWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TechSupportWhereInputSchema), z.lazy(() => TechSupportWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    speciality: z.union([z.lazy(() => EnumTechSupportSpecialtyFilterSchema), z.lazy(() => TechSupportSpecialtySchema)]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
});
export const TechSupportOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    speciality: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
});
export const TechSupportWhereUniqueInputSchema = z.union([
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
    .and(z.strictObject({
    id: z.uuid().optional(),
    userId: z.string().optional(),
    AND: z.union([z.lazy(() => TechSupportWhereInputSchema), z.lazy(() => TechSupportWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TechSupportWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TechSupportWhereInputSchema), z.lazy(() => TechSupportWhereInputSchema).array()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    speciality: z.union([z.lazy(() => EnumTechSupportSpecialtyFilterSchema), z.lazy(() => TechSupportSpecialtySchema)]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
}));
export const TechSupportOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    speciality: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TechSupportCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TechSupportMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TechSupportMinOrderByAggregateInputSchema).optional(),
});
export const TechSupportScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema), z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema), z.lazy(() => TechSupportScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    speciality: z.union([z.lazy(() => EnumTechSupportSpecialtyWithAggregatesFilterSchema), z.lazy(() => TechSupportSpecialtySchema)]).optional(),
});
export const PasswordResetTokenWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    usedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
});
export const PasswordResetTokenOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    usedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});
export const PasswordResetTokenWhereUniqueInputSchema = z.union([
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
    .and(z.strictObject({
    id: z.uuid().optional(),
    token: z.string().optional(),
    AND: z.union([z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => PasswordResetTokenWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => PasswordResetTokenWhereInputSchema), z.lazy(() => PasswordResetTokenWhereInputSchema).array()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    usedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}));
export const PasswordResetTokenOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    usedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => PasswordResetTokenCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => PasswordResetTokenMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => PasswordResetTokenMinOrderByAggregateInputSchema).optional(),
});
export const PasswordResetTokenScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => PasswordResetTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    usedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const TicketCategoryWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketCategoryWhereInputSchema), z.lazy(() => TicketCategoryWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCategoryWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCategoryWhereInputSchema), z.lazy(() => TicketCategoryWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
});
export const TicketCategoryOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    tickets: z.lazy(() => TicketOrderByRelationAggregateInputSchema).optional(),
});
export const TicketCategoryWhereUniqueInputSchema = z.union([
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
    .and(z.strictObject({
    id: z.uuid().optional(),
    name: z.string().optional(),
    AND: z.union([z.lazy(() => TicketCategoryWhereInputSchema), z.lazy(() => TicketCategoryWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCategoryWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCategoryWhereInputSchema), z.lazy(() => TicketCategoryWhereInputSchema).array()]).optional(),
    description: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
}));
export const TicketCategoryOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TicketCategoryCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TicketCategoryMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TicketCategoryMinOrderByAggregateInputSchema).optional(),
});
export const TicketCategoryScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketCategoryScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const TicketWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketWhereInputSchema), z.lazy(() => TicketWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketWhereInputSchema), z.lazy(() => TicketWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z.union([z.lazy(() => EnumTicketStatusFilterSchema), z.lazy(() => TicketStatusSchema)]).optional(),
    priority: z.union([z.lazy(() => EnumTicketPriorityFilterSchema), z.lazy(() => TicketPrioritySchema)]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    resolvedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    closedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    creatorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    assigneeId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    categoryId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    techSupportId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    creator: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    assignee: z.union([z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional().nullable(),
    category: z.union([z.lazy(() => TicketCategoryNullableScalarRelationFilterSchema), z.lazy(() => TicketCategoryWhereInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentListRelationFilterSchema).optional(),
    comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
    histories: z.lazy(() => TicketHistoryListRelationFilterSchema).optional(),
    notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
    techSupport: z.union([z.lazy(() => TechSupportNullableScalarRelationFilterSchema), z.lazy(() => TechSupportWhereInputSchema)]).optional().nullable(),
});
export const TicketOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    priority: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    resolvedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    closedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    creatorId: z.lazy(() => SortOrderSchema).optional(),
    assigneeId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    categoryId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    techSupportId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    creator: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    assignee: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    category: z.lazy(() => TicketCategoryOrderByWithRelationInputSchema).optional(),
    attachments: z.lazy(() => AttachmentOrderByRelationAggregateInputSchema).optional(),
    comments: z.lazy(() => TicketCommentOrderByRelationAggregateInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryOrderByRelationAggregateInputSchema).optional(),
    notifications: z.lazy(() => NotificationOrderByRelationAggregateInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportOrderByWithRelationInputSchema).optional(),
});
export const TicketWhereUniqueInputSchema = z.object({
    id: z.uuid(),
})
    .and(z.strictObject({
    id: z.uuid().optional(),
    AND: z.union([z.lazy(() => TicketWhereInputSchema), z.lazy(() => TicketWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketWhereInputSchema), z.lazy(() => TicketWhereInputSchema).array()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z.union([z.lazy(() => EnumTicketStatusFilterSchema), z.lazy(() => TicketStatusSchema)]).optional(),
    priority: z.union([z.lazy(() => EnumTicketPriorityFilterSchema), z.lazy(() => TicketPrioritySchema)]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    resolvedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    closedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    creatorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    assigneeId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    categoryId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    techSupportId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    creator: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    assignee: z.union([z.lazy(() => UserNullableScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional().nullable(),
    category: z.union([z.lazy(() => TicketCategoryNullableScalarRelationFilterSchema), z.lazy(() => TicketCategoryWhereInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentListRelationFilterSchema).optional(),
    comments: z.lazy(() => TicketCommentListRelationFilterSchema).optional(),
    histories: z.lazy(() => TicketHistoryListRelationFilterSchema).optional(),
    notifications: z.lazy(() => NotificationListRelationFilterSchema).optional(),
    techSupport: z.union([z.lazy(() => TechSupportNullableScalarRelationFilterSchema), z.lazy(() => TechSupportWhereInputSchema)]).optional().nullable(),
}));
export const TicketOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    status: z.lazy(() => SortOrderSchema).optional(),
    priority: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    resolvedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    closedAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    creatorId: z.lazy(() => SortOrderSchema).optional(),
    assigneeId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    categoryId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    techSupportId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    _count: z.lazy(() => TicketCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TicketMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TicketMinOrderByAggregateInputSchema).optional(),
});
export const TicketScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    status: z.union([z.lazy(() => EnumTicketStatusWithAggregatesFilterSchema), z.lazy(() => TicketStatusSchema)]).optional(),
    priority: z.union([z.lazy(() => EnumTicketPriorityWithAggregatesFilterSchema), z.lazy(() => TicketPrioritySchema)]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    resolvedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
    closedAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
    creatorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    assigneeId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    categoryId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    techSupportId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
});
export const AttachmentWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => AttachmentWhereInputSchema), z.lazy(() => AttachmentWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => AttachmentWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AttachmentWhereInputSchema), z.lazy(() => AttachmentWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileSize: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    mimeType: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    source: z.union([z.lazy(() => EnumAttachmentSourceFilterSchema), z.lazy(() => AttachmentSourceSchema)]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
});
export const AttachmentOrderByWithRelationInputSchema = z.strictObject({
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
export const AttachmentWhereUniqueInputSchema = z.object({
    id: z.uuid(),
})
    .and(z.strictObject({
    id: z.uuid().optional(),
    AND: z.union([z.lazy(() => AttachmentWhereInputSchema), z.lazy(() => AttachmentWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => AttachmentWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AttachmentWhereInputSchema), z.lazy(() => AttachmentWhereInputSchema).array()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileSize: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
    mimeType: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    source: z.union([z.lazy(() => EnumAttachmentSourceFilterSchema), z.lazy(() => AttachmentSourceSchema)]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
}));
export const AttachmentOrderByWithAggregationInputSchema = z.strictObject({
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
export const AttachmentScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema), z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema), z.lazy(() => AttachmentScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    fileUrl: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    fileSize: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
    mimeType: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    source: z.union([z.lazy(() => EnumAttachmentSourceWithAggregatesFilterSchema), z.lazy(() => AttachmentSourceSchema)]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const TicketCommentWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketCommentWhereInputSchema), z.lazy(() => TicketCommentWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCommentWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCommentWhereInputSchema), z.lazy(() => TicketCommentWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
    author: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
});
export const TicketCommentOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
    author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});
export const TicketCommentWhereUniqueInputSchema = z.object({
    id: z.uuid(),
})
    .and(z.strictObject({
    id: z.uuid().optional(),
    AND: z.union([z.lazy(() => TicketCommentWhereInputSchema), z.lazy(() => TicketCommentWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCommentWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCommentWhereInputSchema), z.lazy(() => TicketCommentWhereInputSchema).array()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
    author: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}));
export const TicketCommentOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TicketCommentCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TicketCommentMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TicketCommentMinOrderByAggregateInputSchema).optional(),
});
export const TicketCommentScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketCommentScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const TicketHistoryWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketHistoryWhereInputSchema), z.lazy(() => TicketHistoryWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketHistoryWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketHistoryWhereInputSchema), z.lazy(() => TicketHistoryWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    changedById: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    field: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    oldValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    newValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    note: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
    changedBy: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
});
export const TicketHistoryOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    changedById: z.lazy(() => SortOrderSchema).optional(),
    field: z.lazy(() => SortOrderSchema).optional(),
    oldValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    newValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    note: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
    changedBy: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
});
export const TicketHistoryWhereUniqueInputSchema = z.object({
    id: z.uuid(),
})
    .and(z.strictObject({
    id: z.uuid().optional(),
    AND: z.union([z.lazy(() => TicketHistoryWhereInputSchema), z.lazy(() => TicketHistoryWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketHistoryWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketHistoryWhereInputSchema), z.lazy(() => TicketHistoryWhereInputSchema).array()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    changedById: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    field: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    oldValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    newValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    note: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    ticket: z.union([z.lazy(() => TicketScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional(),
    changedBy: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
}));
export const TicketHistoryOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    changedById: z.lazy(() => SortOrderSchema).optional(),
    field: z.lazy(() => SortOrderSchema).optional(),
    oldValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    newValue: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    note: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => TicketHistoryCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => TicketHistoryMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => TicketHistoryMinOrderByAggregateInputSchema).optional(),
});
export const TicketHistoryScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema), z.lazy(() => TicketHistoryScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    changedById: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    field: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    oldValue: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    newValue: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    note: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const NotificationWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    type: z.union([z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema)]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isRead: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    readAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    ticket: z.union([z.lazy(() => TicketNullableScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional().nullable(),
});
export const NotificationOrderByWithRelationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    isRead: z.lazy(() => SortOrderSchema).optional(),
    readAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    ticket: z.lazy(() => TicketOrderByWithRelationInputSchema).optional(),
});
export const NotificationWhereUniqueInputSchema = z.object({
    id: z.uuid(),
})
    .and(z.strictObject({
    id: z.uuid().optional(),
    AND: z.union([z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => NotificationWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => NotificationWhereInputSchema), z.lazy(() => NotificationWhereInputSchema).array()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    type: z.union([z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema)]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isRead: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    readAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    user: z.union([z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional(),
    ticket: z.union([z.lazy(() => TicketNullableScalarRelationFilterSchema), z.lazy(() => TicketWhereInputSchema)]).optional().nullable(),
}));
export const NotificationOrderByWithAggregationInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    type: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    isRead: z.lazy(() => SortOrderSchema).optional(),
    readAt: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => NotificationCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => NotificationMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => NotificationMinOrderByAggregateInputSchema).optional(),
});
export const NotificationScalarWhereWithAggregatesInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array()]).optional(),
    OR: z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema), z.lazy(() => NotificationScalarWhereWithAggregatesInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
    type: z.union([z.lazy(() => EnumNotificationTypeWithAggregatesFilterSchema), z.lazy(() => NotificationTypeSchema)]).optional(),
    title: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
    isRead: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional(),
    readAt: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional(),
});
export const UserCreateInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserCreateManyInputSchema = z.strictObject({
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
export const UserUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const UserUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const TechSupportCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutTechSupportsInputSchema),
    tickets: z.lazy(() => TicketCreateNestedManyWithoutTechSupportInputSchema).optional(),
});
export const TechSupportUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
    tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema).optional(),
});
export const TechSupportUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema).optional(),
    tickets: z.lazy(() => TicketUpdateManyWithoutTechSupportNestedInputSchema).optional(),
});
export const TechSupportUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
    tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema).optional(),
});
export const TechSupportCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
});
export const TechSupportUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
});
export const TechSupportUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
});
export const PasswordResetTokenCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutPasswordResetTokensInputSchema),
});
export const PasswordResetTokenUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    userId: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const PasswordResetTokenUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputSchema).optional(),
});
export const PasswordResetTokenUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const PasswordResetTokenCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    userId: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const PasswordResetTokenUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const PasswordResetTokenUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCategoryCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    tickets: z.lazy(() => TicketCreateNestedManyWithoutCategoryInputSchema).optional(),
});
export const TicketCategoryUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCategoryInputSchema).optional(),
});
export const TicketCategoryUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    tickets: z.lazy(() => TicketUpdateManyWithoutCategoryNestedInputSchema).optional(),
});
export const TicketCategoryUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional(),
});
export const TicketCategoryCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketCategoryUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCategoryUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCreateInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketCreateManyInputSchema = z.strictObject({
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
export const TicketUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const TicketUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const AttachmentCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutAttachmentsInputSchema),
});
export const AttachmentUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
});
export const AttachmentUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneRequiredWithoutAttachmentsNestedInputSchema).optional(),
});
export const AttachmentUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const AttachmentCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
});
export const AttachmentUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const AttachmentUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutCommentsInputSchema),
    author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
});
export const TicketCommentUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketCommentUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
    author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});
export const TicketCommentUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketCommentUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutHistoriesInputSchema),
    changedBy: z.lazy(() => UserCreateNestedOneWithoutTicketHistoriesInputSchema),
});
export const TicketHistoryUncheckedCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    changedById: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketHistoryUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema).optional(),
    changedBy: z.lazy(() => UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema).optional(),
});
export const TicketHistoryUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    changedById: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryCreateManyInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    changedById: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketHistoryUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    changedById: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationCreateInputSchema = z.strictObject({
    id: z.uuid().optional(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutNotificationsInputSchema).optional(),
});
export const NotificationUncheckedCreateInputSchema = z.strictObject({
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
export const NotificationUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
    ticket: z.lazy(() => TicketUpdateOneWithoutNotificationsNestedInputSchema).optional(),
});
export const NotificationUncheckedUpdateInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationCreateManyInputSchema = z.strictObject({
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
export const NotificationUpdateManyMutationInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationUncheckedUpdateManyInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const StringFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
});
export const StringNullableFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
});
export const EnumUserRoleFilterSchema = z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z.lazy(() => UserRoleSchema).array().optional(),
    notIn: z.lazy(() => UserRoleSchema).array().optional(),
    not: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema)]).optional(),
});
export const BoolFilterSchema = z.strictObject({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});
export const DateTimeFilterSchema = z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
});
export const DateTimeNullableFilterSchema = z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
});
export const PasswordResetTokenListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
    some: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
    none: z.lazy(() => PasswordResetTokenWhereInputSchema).optional(),
});
export const TicketListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => TicketWhereInputSchema).optional(),
    some: z.lazy(() => TicketWhereInputSchema).optional(),
    none: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const TicketCommentListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => TicketCommentWhereInputSchema).optional(),
    some: z.lazy(() => TicketCommentWhereInputSchema).optional(),
    none: z.lazy(() => TicketCommentWhereInputSchema).optional(),
});
export const TicketHistoryListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
    some: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
    none: z.lazy(() => TicketHistoryWhereInputSchema).optional(),
});
export const NotificationListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => NotificationWhereInputSchema).optional(),
    some: z.lazy(() => NotificationWhereInputSchema).optional(),
    none: z.lazy(() => NotificationWhereInputSchema).optional(),
});
export const TechSupportListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => TechSupportWhereInputSchema).optional(),
    some: z.lazy(() => TechSupportWhereInputSchema).optional(),
    none: z.lazy(() => TechSupportWhereInputSchema).optional(),
});
export const SortOrderInputSchema = z.strictObject({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
});
export const PasswordResetTokenOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCommentOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketHistoryOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const NotificationOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const TechSupportOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const UserCountOrderByAggregateInputSchema = z.strictObject({
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
export const UserMaxOrderByAggregateInputSchema = z.strictObject({
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
export const UserMinOrderByAggregateInputSchema = z.strictObject({
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
export const StringWithAggregatesFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
});
export const StringNullableWithAggregatesFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});
export const EnumUserRoleWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z.lazy(() => UserRoleSchema).array().optional(),
    notIn: z.lazy(() => UserRoleSchema).array().optional(),
    not: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});
export const BoolWithAggregatesFilterSchema = z.strictObject({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});
export const DateTimeWithAggregatesFilterSchema = z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});
export const DateTimeNullableWithAggregatesFilterSchema = z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});
export const EnumTechSupportSpecialtyFilterSchema = z.strictObject({
    equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
    in: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    notIn: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    not: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema)]).optional(),
});
export const UserScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
});
export const TechSupportCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    speciality: z.lazy(() => SortOrderSchema).optional(),
});
export const TechSupportMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    speciality: z.lazy(() => SortOrderSchema).optional(),
});
export const TechSupportMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    speciality: z.lazy(() => SortOrderSchema).optional(),
});
export const EnumTechSupportSpecialtyWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
    in: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    notIn: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    not: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
});
export const PasswordResetTokenCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    usedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const PasswordResetTokenMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    usedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const PasswordResetTokenMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    usedAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCategoryCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCategoryMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCategoryMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    description: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const EnumTicketStatusFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketStatusSchema).optional(),
    in: z.lazy(() => TicketStatusSchema).array().optional(),
    notIn: z.lazy(() => TicketStatusSchema).array().optional(),
    not: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => NestedEnumTicketStatusFilterSchema)]).optional(),
});
export const EnumTicketPriorityFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketPrioritySchema).optional(),
    in: z.lazy(() => TicketPrioritySchema).array().optional(),
    notIn: z.lazy(() => TicketPrioritySchema).array().optional(),
    not: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => NestedEnumTicketPriorityFilterSchema)]).optional(),
});
export const UserNullableScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
    isNot: z.lazy(() => UserWhereInputSchema).optional().nullable(),
});
export const TicketCategoryNullableScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => TicketCategoryWhereInputSchema).optional().nullable(),
    isNot: z.lazy(() => TicketCategoryWhereInputSchema).optional().nullable(),
});
export const AttachmentListRelationFilterSchema = z.strictObject({
    every: z.lazy(() => AttachmentWhereInputSchema).optional(),
    some: z.lazy(() => AttachmentWhereInputSchema).optional(),
    none: z.lazy(() => AttachmentWhereInputSchema).optional(),
});
export const TechSupportNullableScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => TechSupportWhereInputSchema).optional().nullable(),
    isNot: z.lazy(() => TechSupportWhereInputSchema).optional().nullable(),
});
export const AttachmentOrderByRelationAggregateInputSchema = z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCountOrderByAggregateInputSchema = z.strictObject({
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
export const TicketMaxOrderByAggregateInputSchema = z.strictObject({
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
export const TicketMinOrderByAggregateInputSchema = z.strictObject({
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
export const EnumTicketStatusWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketStatusSchema).optional(),
    in: z.lazy(() => TicketStatusSchema).array().optional(),
    notIn: z.lazy(() => TicketStatusSchema).array().optional(),
    not: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
});
export const EnumTicketPriorityWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketPrioritySchema).optional(),
    in: z.lazy(() => TicketPrioritySchema).array().optional(),
    notIn: z.lazy(() => TicketPrioritySchema).array().optional(),
    not: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => NestedEnumTicketPriorityWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
});
export const IntFilterSchema = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});
export const EnumAttachmentSourceFilterSchema = z.strictObject({
    equals: z.lazy(() => AttachmentSourceSchema).optional(),
    in: z.lazy(() => AttachmentSourceSchema).array().optional(),
    notIn: z.lazy(() => AttachmentSourceSchema).array().optional(),
    not: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => NestedEnumAttachmentSourceFilterSchema)]).optional(),
});
export const TicketScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => TicketWhereInputSchema).optional(),
    isNot: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const AttachmentCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    fileUrl: z.lazy(() => SortOrderSchema).optional(),
    fileSize: z.lazy(() => SortOrderSchema).optional(),
    mimeType: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const AttachmentAvgOrderByAggregateInputSchema = z.strictObject({
    fileSize: z.lazy(() => SortOrderSchema).optional(),
});
export const AttachmentMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    fileUrl: z.lazy(() => SortOrderSchema).optional(),
    fileSize: z.lazy(() => SortOrderSchema).optional(),
    mimeType: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const AttachmentMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    fileName: z.lazy(() => SortOrderSchema).optional(),
    fileUrl: z.lazy(() => SortOrderSchema).optional(),
    fileSize: z.lazy(() => SortOrderSchema).optional(),
    mimeType: z.lazy(() => SortOrderSchema).optional(),
    source: z.lazy(() => SortOrderSchema).optional(),
    uploadedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const AttachmentSumOrderByAggregateInputSchema = z.strictObject({
    fileSize: z.lazy(() => SortOrderSchema).optional(),
});
export const IntWithAggregatesFilterSchema = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
});
export const EnumAttachmentSourceWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => AttachmentSourceSchema).optional(),
    in: z.lazy(() => AttachmentSourceSchema).array().optional(),
    notIn: z.lazy(() => AttachmentSourceSchema).array().optional(),
    not: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => NestedEnumAttachmentSourceWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
});
export const TicketCommentCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCommentMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketCommentMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    body: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketHistoryCountOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    changedById: z.lazy(() => SortOrderSchema).optional(),
    field: z.lazy(() => SortOrderSchema).optional(),
    oldValue: z.lazy(() => SortOrderSchema).optional(),
    newValue: z.lazy(() => SortOrderSchema).optional(),
    note: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketHistoryMaxOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    changedById: z.lazy(() => SortOrderSchema).optional(),
    field: z.lazy(() => SortOrderSchema).optional(),
    oldValue: z.lazy(() => SortOrderSchema).optional(),
    newValue: z.lazy(() => SortOrderSchema).optional(),
    note: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const TicketHistoryMinOrderByAggregateInputSchema = z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    ticketId: z.lazy(() => SortOrderSchema).optional(),
    changedById: z.lazy(() => SortOrderSchema).optional(),
    field: z.lazy(() => SortOrderSchema).optional(),
    oldValue: z.lazy(() => SortOrderSchema).optional(),
    newValue: z.lazy(() => SortOrderSchema).optional(),
    note: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
});
export const EnumNotificationTypeFilterSchema = z.strictObject({
    equals: z.lazy(() => NotificationTypeSchema).optional(),
    in: z.lazy(() => NotificationTypeSchema).array().optional(),
    notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
    not: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema)]).optional(),
});
export const TicketNullableScalarRelationFilterSchema = z.strictObject({
    is: z.lazy(() => TicketWhereInputSchema).optional().nullable(),
    isNot: z.lazy(() => TicketWhereInputSchema).optional().nullable(),
});
export const NotificationCountOrderByAggregateInputSchema = z.strictObject({
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
export const NotificationMaxOrderByAggregateInputSchema = z.strictObject({
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
export const NotificationMinOrderByAggregateInputSchema = z.strictObject({
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
export const EnumNotificationTypeWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => NotificationTypeSchema).optional(),
    in: z.lazy(() => NotificationTypeSchema).array().optional(),
    notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
    not: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
});
export const PasswordResetTokenCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCreateNestedManyWithoutCreatorInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCreateNestedManyWithoutAssigneeInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema), z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCommentCreateNestedManyWithoutAuthorInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketHistoryCreateNestedManyWithoutChangedByInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
});
export const NotificationCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
});
export const TechSupportCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema), z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
});
export const PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
});
export const TicketUncheckedCreateNestedManyWithoutCreatorInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema), z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
});
export const NotificationUncheckedCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
});
export const TechSupportUncheckedCreateNestedManyWithoutUserInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema), z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
});
export const StringFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.string().optional(),
});
export const NullableStringFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.string().optional().nullable(),
});
export const EnumUserRoleFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => UserRoleSchema).optional(),
});
export const BoolFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.boolean().optional(),
});
export const DateTimeFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.coerce.date().optional(),
});
export const NullableDateTimeFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.coerce.date().optional().nullable(),
});
export const PasswordResetTokenUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array()]).optional(),
});
export const TicketUpdateManyWithoutCreatorNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketUpdateManyWithoutAssigneeNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema), z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketCommentUpdateManyWithoutAuthorNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
});
export const TicketHistoryUpdateManyWithoutChangedByNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
});
export const NotificationUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
});
export const TechSupportUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema), z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TechSupportScalarWhereInputSchema), z.lazy(() => TechSupportScalarWhereInputSchema).array()]).optional(),
});
export const PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema).array(), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema), z.lazy(() => PasswordResetTokenCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => PasswordResetTokenCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => PasswordResetTokenWhereUniqueInputSchema), z.lazy(() => PasswordResetTokenWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array()]).optional(),
});
export const TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketCreateWithoutCreatorInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCreatorInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCreatorInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutCreatorInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutCreatorInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketCreateWithoutAssigneeInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema), z.lazy(() => TicketCreateOrConnectWithoutAssigneeInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyAssigneeInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutAssigneeInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutAuthorInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyAuthorInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema), z.lazy(() => TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
});
export const TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutChangedByInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyChangedByInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
});
export const NotificationUncheckedUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationCreateWithoutUserInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
});
export const TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportCreateWithoutUserInputSchema).array(), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema), z.lazy(() => TechSupportCreateOrConnectWithoutUserInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TechSupportUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    createMany: z.lazy(() => TechSupportCreateManyUserInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TechSupportWhereUniqueInputSchema), z.lazy(() => TechSupportWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => TechSupportUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => TechSupportUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TechSupportScalarWhereInputSchema), z.lazy(() => TechSupportScalarWhereInputSchema).array()]).optional(),
});
export const UserCreateNestedOneWithoutTechSupportsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechSupportsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const TicketCreateNestedManyWithoutTechSupportInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema), z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema), z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => TechSupportSpecialtySchema).optional(),
});
export const UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTechSupportsInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutTechSupportsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTechSupportsInputSchema), z.lazy(() => UserUpdateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema)]).optional(),
});
export const TicketUpdateManyWithoutTechSupportNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema), z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketCreateWithoutTechSupportInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema), z.lazy(() => TicketCreateOrConnectWithoutTechSupportInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyTechSupportInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutTechSupportInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const UserCreateNestedOneWithoutPasswordResetTokensInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const UserUpdateOneRequiredWithoutPasswordResetTokensNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPasswordResetTokensInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutPasswordResetTokensInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema)]).optional(),
});
export const TicketCreateNestedManyWithoutCategoryInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketUncheckedCreateNestedManyWithoutCategoryInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
});
export const TicketUpdateManyWithoutCategoryNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const TicketUncheckedUpdateManyWithoutCategoryNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketCreateWithoutCategoryInputSchema).array(), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema), z.lazy(() => TicketCreateOrConnectWithoutCategoryInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema), z.lazy(() => TicketUpsertWithWhereUniqueWithoutCategoryInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCreateManyCategoryInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketWhereUniqueInputSchema), z.lazy(() => TicketWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema), z.lazy(() => TicketUpdateWithWhereUniqueWithoutCategoryInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema), z.lazy(() => TicketUpdateManyWithWhereWithoutCategoryInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
});
export const UserCreateNestedOneWithoutTicketsCreatedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketsCreatedInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const UserCreateNestedOneWithoutTicketsAssignedToInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketsAssignedToInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const TicketCategoryCreateNestedOneWithoutTicketsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCategoryCreateOrConnectWithoutTicketsInputSchema).optional(),
    connect: z.lazy(() => TicketCategoryWhereUniqueInputSchema).optional(),
});
export const AttachmentCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCommentCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketHistoryCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
});
export const NotificationCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
});
export const TechSupportCreateNestedOneWithoutTicketsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TechSupportCreateOrConnectWithoutTicketsInputSchema).optional(),
    connect: z.lazy(() => TechSupportWhereUniqueInputSchema).optional(),
});
export const AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
});
export const TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
});
export const NotificationUncheckedCreateNestedManyWithoutTicketInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
});
export const EnumTicketStatusFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => TicketStatusSchema).optional(),
});
export const EnumTicketPriorityFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => TicketPrioritySchema).optional(),
});
export const UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketsCreatedInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutTicketsCreatedInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTicketsCreatedInputSchema), z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema)]).optional(),
});
export const UserUpdateOneWithoutTicketsAssignedToNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketsAssignedToInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutTicketsAssignedToInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => UserWhereInputSchema)]).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema)]).optional(),
});
export const TicketCategoryUpdateOneWithoutTicketsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCategoryCreateOrConnectWithoutTicketsInputSchema).optional(),
    upsert: z.lazy(() => TicketCategoryUpsertWithoutTicketsInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => TicketCategoryWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => TicketCategoryWhereInputSchema)]).optional(),
    connect: z.lazy(() => TicketCategoryWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TicketCategoryUpdateToOneWithWhereWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema)]).optional(),
});
export const AttachmentUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => AttachmentScalarWhereInputSchema), z.lazy(() => AttachmentScalarWhereInputSchema).array()]).optional(),
});
export const TicketCommentUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
});
export const TicketHistoryUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
});
export const NotificationUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
});
export const TechSupportUpdateOneWithoutTicketsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TechSupportCreateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TechSupportCreateOrConnectWithoutTicketsInputSchema).optional(),
    upsert: z.lazy(() => TechSupportUpsertWithoutTicketsInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => TechSupportWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => TechSupportWhereInputSchema)]).optional(),
    connect: z.lazy(() => TechSupportWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TechSupportUpdateToOneWithWhereWithoutTicketsInputSchema), z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema)]).optional(),
});
export const AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentCreateWithoutTicketInputSchema).array(), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => AttachmentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => AttachmentCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => AttachmentWhereUniqueInputSchema), z.lazy(() => AttachmentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => AttachmentUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => AttachmentScalarWhereInputSchema), z.lazy(() => AttachmentScalarWhereInputSchema).array()]).optional(),
});
export const TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketCommentCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketCommentCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketCommentWhereUniqueInputSchema), z.lazy(() => TicketCommentWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => TicketCommentUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
});
export const TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema).array(), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema), z.lazy(() => TicketHistoryCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => TicketHistoryCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => TicketHistoryWhereUniqueInputSchema), z.lazy(() => TicketHistoryWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
});
export const NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationCreateWithoutTicketInputSchema).array(), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema).array()]).optional(),
    connectOrCreate: z.union([z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema), z.lazy(() => NotificationCreateOrConnectWithoutTicketInputSchema).array()]).optional(),
    upsert: z.union([z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => NotificationUpsertWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    createMany: z.lazy(() => NotificationCreateManyTicketInputEnvelopeSchema).optional(),
    set: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    disconnect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    delete: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    connect: z.union([z.lazy(() => NotificationWhereUniqueInputSchema), z.lazy(() => NotificationWhereUniqueInputSchema).array()]).optional(),
    update: z.union([z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema), z.lazy(() => NotificationUpdateWithWhereUniqueWithoutTicketInputSchema).array()]).optional(),
    updateMany: z.union([z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema), z.lazy(() => NotificationUpdateManyWithWhereWithoutTicketInputSchema).array()]).optional(),
    deleteMany: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
});
export const TicketCreateNestedOneWithoutAttachmentsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutAttachmentsInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
});
export const IntFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.number().optional(),
    increment: z.number().optional(),
    decrement: z.number().optional(),
    multiply: z.number().optional(),
    divide: z.number().optional(),
});
export const EnumAttachmentSourceFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => AttachmentSourceSchema).optional(),
});
export const TicketUpdateOneRequiredWithoutAttachmentsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutAttachmentsInputSchema).optional(),
    upsert: z.lazy(() => TicketUpsertWithoutAttachmentsInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TicketUpdateToOneWithWhereWithoutAttachmentsInputSchema), z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema)]).optional(),
});
export const TicketCreateNestedOneWithoutCommentsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutCommentsInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
});
export const UserCreateNestedOneWithoutCommentsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const TicketUpdateOneRequiredWithoutCommentsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutCommentsInputSchema).optional(),
    upsert: z.lazy(() => TicketUpsertWithoutCommentsInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TicketUpdateToOneWithWhereWithoutCommentsInputSchema), z.lazy(() => TicketUpdateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema)]).optional(),
});
export const UserUpdateOneRequiredWithoutCommentsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCommentsInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutCommentsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCommentsInputSchema), z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema)]).optional(),
});
export const TicketCreateNestedOneWithoutHistoriesInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutHistoriesInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
});
export const UserCreateNestedOneWithoutTicketHistoriesInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketHistoriesInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutHistoriesInputSchema).optional(),
    upsert: z.lazy(() => TicketUpsertWithoutHistoriesInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TicketUpdateToOneWithWhereWithoutHistoriesInputSchema), z.lazy(() => TicketUpdateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema)]).optional(),
});
export const UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTicketHistoriesInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutTicketHistoriesInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTicketHistoriesInputSchema), z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema)]).optional(),
});
export const UserCreateNestedOneWithoutNotificationsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});
export const TicketCreateNestedOneWithoutNotificationsInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutNotificationsInputSchema).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
});
export const EnumNotificationTypeFieldUpdateOperationsInputSchema = z.strictObject({
    set: z.lazy(() => NotificationTypeSchema).optional(),
});
export const UserUpdateOneRequiredWithoutNotificationsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutNotificationsInputSchema).optional(),
    upsert: z.lazy(() => UserUpsertWithoutNotificationsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema)]).optional(),
});
export const TicketUpdateOneWithoutNotificationsNestedInputSchema = z.strictObject({
    create: z.union([z.lazy(() => TicketCreateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema)]).optional(),
    connectOrCreate: z.lazy(() => TicketCreateOrConnectWithoutNotificationsInputSchema).optional(),
    upsert: z.lazy(() => TicketUpsertWithoutNotificationsInputSchema).optional(),
    disconnect: z.union([z.boolean(), z.lazy(() => TicketWhereInputSchema)]).optional(),
    delete: z.union([z.boolean(), z.lazy(() => TicketWhereInputSchema)]).optional(),
    connect: z.lazy(() => TicketWhereUniqueInputSchema).optional(),
    update: z.union([z.lazy(() => TicketUpdateToOneWithWhereWithoutNotificationsInputSchema), z.lazy(() => TicketUpdateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema)]).optional(),
});
export const NestedStringFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional(),
});
export const NestedStringNullableFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable(),
});
export const NestedEnumUserRoleFilterSchema = z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z.lazy(() => UserRoleSchema).array().optional(),
    notIn: z.lazy(() => UserRoleSchema).array().optional(),
    not: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleFilterSchema)]).optional(),
});
export const NestedBoolFilterSchema = z.strictObject({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
});
export const NestedDateTimeFilterSchema = z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional(),
});
export const NestedDateTimeNullableFilterSchema = z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable(),
});
export const NestedStringWithAggregatesFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
});
export const NestedIntFilterSchema = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
});
export const NestedStringNullableWithAggregatesFilterSchema = z.strictObject({
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
    not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});
export const NestedIntNullableFilterSchema = z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable(),
});
export const NestedEnumUserRoleWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => UserRoleSchema).optional(),
    in: z.lazy(() => UserRoleSchema).array().optional(),
    notIn: z.lazy(() => UserRoleSchema).array().optional(),
    not: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => NestedEnumUserRoleWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumUserRoleFilterSchema).optional(),
});
export const NestedBoolWithAggregatesFilterSchema = z.strictObject({
    equals: z.boolean().optional(),
    not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
});
export const NestedDateTimeWithAggregatesFilterSchema = z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});
export const NestedDateTimeNullableWithAggregatesFilterSchema = z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
});
export const NestedEnumTechSupportSpecialtyFilterSchema = z.strictObject({
    equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
    in: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    notIn: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    not: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema)]).optional(),
});
export const NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TechSupportSpecialtySchema).optional(),
    in: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    notIn: z.lazy(() => TechSupportSpecialtySchema).array().optional(),
    not: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => NestedEnumTechSupportSpecialtyWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTechSupportSpecialtyFilterSchema).optional(),
});
export const NestedEnumTicketStatusFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketStatusSchema).optional(),
    in: z.lazy(() => TicketStatusSchema).array().optional(),
    notIn: z.lazy(() => TicketStatusSchema).array().optional(),
    not: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => NestedEnumTicketStatusFilterSchema)]).optional(),
});
export const NestedEnumTicketPriorityFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketPrioritySchema).optional(),
    in: z.lazy(() => TicketPrioritySchema).array().optional(),
    notIn: z.lazy(() => TicketPrioritySchema).array().optional(),
    not: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => NestedEnumTicketPriorityFilterSchema)]).optional(),
});
export const NestedEnumTicketStatusWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketStatusSchema).optional(),
    in: z.lazy(() => TicketStatusSchema).array().optional(),
    notIn: z.lazy(() => TicketStatusSchema).array().optional(),
    not: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => NestedEnumTicketStatusWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTicketStatusFilterSchema).optional(),
});
export const NestedEnumTicketPriorityWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => TicketPrioritySchema).optional(),
    in: z.lazy(() => TicketPrioritySchema).array().optional(),
    notIn: z.lazy(() => TicketPrioritySchema).array().optional(),
    not: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => NestedEnumTicketPriorityWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumTicketPriorityFilterSchema).optional(),
});
export const NestedEnumAttachmentSourceFilterSchema = z.strictObject({
    equals: z.lazy(() => AttachmentSourceSchema).optional(),
    in: z.lazy(() => AttachmentSourceSchema).array().optional(),
    notIn: z.lazy(() => AttachmentSourceSchema).array().optional(),
    not: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => NestedEnumAttachmentSourceFilterSchema)]).optional(),
});
export const NestedIntWithAggregatesFilterSchema = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
    _sum: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedIntFilterSchema).optional(),
    _max: z.lazy(() => NestedIntFilterSchema).optional(),
});
export const NestedFloatFilterSchema = z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional(),
});
export const NestedEnumAttachmentSourceWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => AttachmentSourceSchema).optional(),
    in: z.lazy(() => AttachmentSourceSchema).array().optional(),
    notIn: z.lazy(() => AttachmentSourceSchema).array().optional(),
    not: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => NestedEnumAttachmentSourceWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumAttachmentSourceFilterSchema).optional(),
});
export const NestedEnumNotificationTypeFilterSchema = z.strictObject({
    equals: z.lazy(() => NotificationTypeSchema).optional(),
    in: z.lazy(() => NotificationTypeSchema).array().optional(),
    notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
    not: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeFilterSchema)]).optional(),
});
export const NestedEnumNotificationTypeWithAggregatesFilterSchema = z.strictObject({
    equals: z.lazy(() => NotificationTypeSchema).optional(),
    in: z.lazy(() => NotificationTypeSchema).array().optional(),
    notIn: z.lazy(() => NotificationTypeSchema).array().optional(),
    not: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => NestedEnumNotificationTypeWithAggregatesFilterSchema)]).optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
    _max: z.lazy(() => NestedEnumNotificationTypeFilterSchema).optional(),
});
export const PasswordResetTokenCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const PasswordResetTokenUncheckedCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const PasswordResetTokenCreateOrConnectWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)]),
});
export const PasswordResetTokenCreateManyUserInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => PasswordResetTokenCreateManyUserInputSchema), z.lazy(() => PasswordResetTokenCreateManyUserInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketCreateWithoutCreatorInputSchema = z.strictObject({
    id: z.uuid().optional(),
    title: z.string(),
    description: z.string(),
    status: z.lazy(() => TicketStatusSchema).optional(),
    priority: z.lazy(() => TicketPrioritySchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    resolvedAt: z.coerce.date().optional().nullable(),
    closedAt: z.coerce.date().optional().nullable(),
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutCreatorInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutCreatorInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema)]),
});
export const TicketCreateManyCreatorInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCreateManyCreatorInputSchema), z.lazy(() => TicketCreateManyCreatorInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketCreateWithoutAssigneeInputSchema = z.strictObject({
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
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutAssigneeInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutAssigneeInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema)]),
});
export const TicketCreateManyAssigneeInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCreateManyAssigneeInputSchema), z.lazy(() => TicketCreateManyAssigneeInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketCommentCreateWithoutAuthorInputSchema = z.strictObject({
    id: z.uuid().optional(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutCommentsInputSchema),
});
export const TicketCommentUncheckedCreateWithoutAuthorInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketCommentCreateOrConnectWithoutAuthorInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)]),
});
export const TicketCommentCreateManyAuthorInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCommentCreateManyAuthorInputSchema), z.lazy(() => TicketCommentCreateManyAuthorInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketHistoryCreateWithoutChangedByInputSchema = z.strictObject({
    id: z.uuid().optional(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutHistoriesInputSchema),
});
export const TicketHistoryUncheckedCreateWithoutChangedByInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketHistoryCreateOrConnectWithoutChangedByInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)]),
});
export const TicketHistoryCreateManyChangedByInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketHistoryCreateManyChangedByInputSchema), z.lazy(() => TicketHistoryCreateManyChangedByInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const NotificationCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    ticket: z.lazy(() => TicketCreateNestedOneWithoutNotificationsInputSchema).optional(),
});
export const NotificationUncheckedCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string().optional().nullable(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const NotificationCreateOrConnectWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema)]),
});
export const NotificationCreateManyUserInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => NotificationCreateManyUserInputSchema), z.lazy(() => NotificationCreateManyUserInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TechSupportCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
    tickets: z.lazy(() => TicketCreateNestedManyWithoutTechSupportInputSchema).optional(),
});
export const TechSupportUncheckedCreateWithoutUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
    tickets: z.lazy(() => TicketUncheckedCreateNestedManyWithoutTechSupportInputSchema).optional(),
});
export const TechSupportCreateOrConnectWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema)]),
});
export const TechSupportCreateManyUserInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TechSupportCreateManyUserInputSchema), z.lazy(() => TechSupportCreateManyUserInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const PasswordResetTokenUpsertWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
    update: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema)]),
    create: z.union([z.lazy(() => PasswordResetTokenCreateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedCreateWithoutUserInputSchema)]),
});
export const PasswordResetTokenUpdateWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => PasswordResetTokenWhereUniqueInputSchema),
    data: z.union([z.lazy(() => PasswordResetTokenUpdateWithoutUserInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateWithoutUserInputSchema)]),
});
export const PasswordResetTokenUpdateManyWithWhereWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => PasswordResetTokenScalarWhereInputSchema),
    data: z.union([z.lazy(() => PasswordResetTokenUpdateManyMutationInputSchema), z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema)]),
});
export const PasswordResetTokenScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => PasswordResetTokenScalarWhereInputSchema), z.lazy(() => PasswordResetTokenScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    usedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
});
export const TicketUpsertWithWhereUniqueWithoutCreatorInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketUpdateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCreatorInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCreatorInputSchema)]),
});
export const TicketUpdateWithWhereUniqueWithoutCreatorInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketUpdateWithoutCreatorInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCreatorInputSchema)]),
});
export const TicketUpdateManyWithWhereWithoutCreatorInputSchema = z.strictObject({
    where: z.lazy(() => TicketScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketUpdateManyMutationInputSchema), z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorInputSchema)]),
});
export const TicketScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketScalarWhereInputSchema), z.lazy(() => TicketScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    status: z.union([z.lazy(() => EnumTicketStatusFilterSchema), z.lazy(() => TicketStatusSchema)]).optional(),
    priority: z.union([z.lazy(() => EnumTicketPriorityFilterSchema), z.lazy(() => TicketPrioritySchema)]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    resolvedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    closedAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    creatorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    assigneeId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    categoryId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    techSupportId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
});
export const TicketUpsertWithWhereUniqueWithoutAssigneeInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketUpdateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutAssigneeInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAssigneeInputSchema)]),
});
export const TicketUpdateWithWhereUniqueWithoutAssigneeInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketUpdateWithoutAssigneeInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutAssigneeInputSchema)]),
});
export const TicketUpdateManyWithWhereWithoutAssigneeInputSchema = z.strictObject({
    where: z.lazy(() => TicketScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketUpdateManyMutationInputSchema), z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeInputSchema)]),
});
export const TicketCommentUpsertWithWhereUniqueWithoutAuthorInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketCommentUpdateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedUpdateWithoutAuthorInputSchema)]),
    create: z.union([z.lazy(() => TicketCommentCreateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutAuthorInputSchema)]),
});
export const TicketCommentUpdateWithWhereUniqueWithoutAuthorInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketCommentUpdateWithoutAuthorInputSchema), z.lazy(() => TicketCommentUncheckedUpdateWithoutAuthorInputSchema)]),
});
export const TicketCommentUpdateManyWithWhereWithoutAuthorInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketCommentUpdateManyMutationInputSchema), z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorInputSchema)]),
});
export const TicketCommentScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketCommentScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketCommentScalarWhereInputSchema), z.lazy(() => TicketCommentScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    authorId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
});
export const TicketHistoryUpsertWithWhereUniqueWithoutChangedByInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateWithoutChangedByInputSchema)]),
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutChangedByInputSchema)]),
});
export const TicketHistoryUpdateWithWhereUniqueWithoutChangedByInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketHistoryUpdateWithoutChangedByInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateWithoutChangedByInputSchema)]),
});
export const TicketHistoryUpdateManyWithWhereWithoutChangedByInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketHistoryUpdateManyMutationInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByInputSchema)]),
});
export const TicketHistoryScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TicketHistoryScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TicketHistoryScalarWhereInputSchema), z.lazy(() => TicketHistoryScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    changedById: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    field: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    oldValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    newValue: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    note: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
});
export const NotificationUpsertWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    update: z.union([z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema)]),
    create: z.union([z.lazy(() => NotificationCreateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutUserInputSchema)]),
});
export const NotificationUpdateWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    data: z.union([z.lazy(() => NotificationUpdateWithoutUserInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutUserInputSchema)]),
});
export const NotificationUpdateManyWithWhereWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => NotificationScalarWhereInputSchema),
    data: z.union([z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutUserInputSchema)]),
});
export const NotificationScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => NotificationScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => NotificationScalarWhereInputSchema), z.lazy(() => NotificationScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
    type: z.union([z.lazy(() => EnumNotificationTypeFilterSchema), z.lazy(() => NotificationTypeSchema)]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    body: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isRead: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    readAt: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
});
export const TechSupportUpsertWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TechSupportUpdateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedUpdateWithoutUserInputSchema)]),
    create: z.union([z.lazy(() => TechSupportCreateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutUserInputSchema)]),
});
export const TechSupportUpdateWithWhereUniqueWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TechSupportUpdateWithoutUserInputSchema), z.lazy(() => TechSupportUncheckedUpdateWithoutUserInputSchema)]),
});
export const TechSupportUpdateManyWithWhereWithoutUserInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportScalarWhereInputSchema),
    data: z.union([z.lazy(() => TechSupportUpdateManyMutationInputSchema), z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserInputSchema)]),
});
export const TechSupportScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => TechSupportScalarWhereInputSchema), z.lazy(() => TechSupportScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => TechSupportScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => TechSupportScalarWhereInputSchema), z.lazy(() => TechSupportScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    updatedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
    speciality: z.union([z.lazy(() => EnumTechSupportSpecialtyFilterSchema), z.lazy(() => TechSupportSpecialtySchema)]).optional(),
});
export const UserCreateWithoutTechSupportsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutTechSupportsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutTechSupportsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema)]),
});
export const TicketCreateWithoutTechSupportInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutTechSupportInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutTechSupportInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)]),
});
export const TicketCreateManyTechSupportInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCreateManyTechSupportInputSchema), z.lazy(() => TicketCreateManyTechSupportInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const UserUpsertWithoutTechSupportsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedCreateWithoutTechSupportsInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutTechSupportsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutTechSupportsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTechSupportsInputSchema)]),
});
export const UserUpdateWithoutTechSupportsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutTechSupportsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const TicketUpsertWithWhereUniqueWithoutTechSupportInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketUpdateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutTechSupportInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedCreateWithoutTechSupportInputSchema)]),
});
export const TicketUpdateWithWhereUniqueWithoutTechSupportInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketUpdateWithoutTechSupportInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutTechSupportInputSchema)]),
});
export const TicketUpdateManyWithWhereWithoutTechSupportInputSchema = z.strictObject({
    where: z.lazy(() => TicketScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketUpdateManyMutationInputSchema), z.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportInputSchema)]),
});
export const UserCreateWithoutPasswordResetTokensInputSchema = z.strictObject({
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
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutPasswordResetTokensInputSchema = z.strictObject({
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
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutPasswordResetTokensInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema)]),
});
export const UserUpsertWithoutPasswordResetTokensInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedCreateWithoutPasswordResetTokensInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutPasswordResetTokensInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutPasswordResetTokensInputSchema), z.lazy(() => UserUncheckedUpdateWithoutPasswordResetTokensInputSchema)]),
});
export const UserUpdateWithoutPasswordResetTokensInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutPasswordResetTokensInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const TicketCreateWithoutCategoryInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutCategoryInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutCategoryInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema)]),
});
export const TicketCreateManyCategoryInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCreateManyCategoryInputSchema), z.lazy(() => TicketCreateManyCategoryInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketUpsertWithWhereUniqueWithoutCategoryInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketUpdateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCategoryInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCategoryInputSchema)]),
});
export const TicketUpdateWithWhereUniqueWithoutCategoryInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketUpdateWithoutCategoryInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCategoryInputSchema)]),
});
export const TicketUpdateManyWithWhereWithoutCategoryInputSchema = z.strictObject({
    where: z.lazy(() => TicketScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketUpdateManyMutationInputSchema), z.lazy(() => TicketUncheckedUpdateManyWithoutCategoryInputSchema)]),
});
export const UserCreateWithoutTicketsCreatedInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutTicketsCreatedInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutTicketsCreatedInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema)]),
});
export const UserCreateWithoutTicketsAssignedToInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutTicketsAssignedToInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutTicketsAssignedToInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema)]),
});
export const TicketCategoryCreateWithoutTicketsInputSchema = z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketCategoryUncheckedCreateWithoutTicketsInputSchema = z.strictObject({
    id: z.uuid().optional(),
    name: z.string(),
    description: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketCategoryCreateOrConnectWithoutTicketsInputSchema = z.strictObject({
    where: z.lazy(() => TicketCategoryWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema)]),
});
export const AttachmentCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
});
export const AttachmentUncheckedCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
});
export const AttachmentCreateOrConnectWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => AttachmentWhereUniqueInputSchema),
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema)]),
});
export const AttachmentCreateManyTicketInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => AttachmentCreateManyTicketInputSchema), z.lazy(() => AttachmentCreateManyTicketInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketCommentCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutCommentsInputSchema),
});
export const TicketCommentUncheckedCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketCommentCreateOrConnectWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)]),
});
export const TicketCommentCreateManyTicketInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketCommentCreateManyTicketInputSchema), z.lazy(() => TicketCommentCreateManyTicketInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TicketHistoryCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    changedBy: z.lazy(() => UserCreateNestedOneWithoutTicketHistoriesInputSchema),
});
export const TicketHistoryUncheckedCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    changedById: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketHistoryCreateOrConnectWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)]),
});
export const TicketHistoryCreateManyTicketInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => TicketHistoryCreateManyTicketInputSchema), z.lazy(() => TicketHistoryCreateManyTicketInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const NotificationCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutNotificationsInputSchema),
});
export const NotificationUncheckedCreateWithoutTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    userId: z.string(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const NotificationCreateOrConnectWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)]),
});
export const NotificationCreateManyTicketInputEnvelopeSchema = z.strictObject({
    data: z.union([z.lazy(() => NotificationCreateManyTicketInputSchema), z.lazy(() => NotificationCreateManyTicketInputSchema).array()]),
    skipDuplicates: z.boolean().optional(),
});
export const TechSupportCreateWithoutTicketsInputSchema = z.strictObject({
    id: z.uuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutTechSupportsInputSchema),
});
export const TechSupportUncheckedCreateWithoutTicketsInputSchema = z.strictObject({
    id: z.uuid().optional(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
});
export const TechSupportCreateOrConnectWithoutTicketsInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TechSupportCreateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema)]),
});
export const UserUpsertWithoutTicketsCreatedInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsCreatedInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutTicketsCreatedInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutTicketsCreatedInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsCreatedInputSchema)]),
});
export const UserUpdateWithoutTicketsCreatedInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutTicketsCreatedInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUpsertWithoutTicketsAssignedToInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketsAssignedToInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutTicketsAssignedToInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutTicketsAssignedToInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketsAssignedToInputSchema)]),
});
export const UserUpdateWithoutTicketsAssignedToInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutTicketsAssignedToInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const TicketCategoryUpsertWithoutTicketsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema)]),
    create: z.union([z.lazy(() => TicketCategoryCreateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedCreateWithoutTicketsInputSchema)]),
    where: z.lazy(() => TicketCategoryWhereInputSchema).optional(),
});
export const TicketCategoryUpdateToOneWithWhereWithoutTicketsInputSchema = z.strictObject({
    where: z.lazy(() => TicketCategoryWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TicketCategoryUpdateWithoutTicketsInputSchema), z.lazy(() => TicketCategoryUncheckedUpdateWithoutTicketsInputSchema)]),
});
export const TicketCategoryUpdateWithoutTicketsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCategoryUncheckedUpdateWithoutTicketsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const AttachmentUpsertWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => AttachmentWhereUniqueInputSchema),
    update: z.union([z.lazy(() => AttachmentUpdateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedUpdateWithoutTicketInputSchema)]),
    create: z.union([z.lazy(() => AttachmentCreateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedCreateWithoutTicketInputSchema)]),
});
export const AttachmentUpdateWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => AttachmentWhereUniqueInputSchema),
    data: z.union([z.lazy(() => AttachmentUpdateWithoutTicketInputSchema), z.lazy(() => AttachmentUncheckedUpdateWithoutTicketInputSchema)]),
});
export const AttachmentUpdateManyWithWhereWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => AttachmentScalarWhereInputSchema),
    data: z.union([z.lazy(() => AttachmentUpdateManyMutationInputSchema), z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketInputSchema)]),
});
export const AttachmentScalarWhereInputSchema = z.strictObject({
    AND: z.union([z.lazy(() => AttachmentScalarWhereInputSchema), z.lazy(() => AttachmentScalarWhereInputSchema).array()]).optional(),
    OR: z.lazy(() => AttachmentScalarWhereInputSchema).array().optional(),
    NOT: z.union([z.lazy(() => AttachmentScalarWhereInputSchema), z.lazy(() => AttachmentScalarWhereInputSchema).array()]).optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    ticketId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileName: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileUrl: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    fileSize: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    mimeType: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    source: z.union([z.lazy(() => EnumAttachmentSourceFilterSchema), z.lazy(() => AttachmentSourceSchema)]).optional(),
    uploadedAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
});
export const TicketCommentUpsertWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketCommentUpdateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedUpdateWithoutTicketInputSchema)]),
    create: z.union([z.lazy(() => TicketCommentCreateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedCreateWithoutTicketInputSchema)]),
});
export const TicketCommentUpdateWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketCommentUpdateWithoutTicketInputSchema), z.lazy(() => TicketCommentUncheckedUpdateWithoutTicketInputSchema)]),
});
export const TicketCommentUpdateManyWithWhereWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketCommentScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketCommentUpdateManyMutationInputSchema), z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketInputSchema)]),
});
export const TicketHistoryUpsertWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    update: z.union([z.lazy(() => TicketHistoryUpdateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateWithoutTicketInputSchema)]),
    create: z.union([z.lazy(() => TicketHistoryCreateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedCreateWithoutTicketInputSchema)]),
});
export const TicketHistoryUpdateWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryWhereUniqueInputSchema),
    data: z.union([z.lazy(() => TicketHistoryUpdateWithoutTicketInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateWithoutTicketInputSchema)]),
});
export const TicketHistoryUpdateManyWithWhereWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => TicketHistoryScalarWhereInputSchema),
    data: z.union([z.lazy(() => TicketHistoryUpdateManyMutationInputSchema), z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketInputSchema)]),
});
export const NotificationUpsertWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    update: z.union([z.lazy(() => NotificationUpdateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutTicketInputSchema)]),
    create: z.union([z.lazy(() => NotificationCreateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedCreateWithoutTicketInputSchema)]),
});
export const NotificationUpdateWithWhereUniqueWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => NotificationWhereUniqueInputSchema),
    data: z.union([z.lazy(() => NotificationUpdateWithoutTicketInputSchema), z.lazy(() => NotificationUncheckedUpdateWithoutTicketInputSchema)]),
});
export const NotificationUpdateManyWithWhereWithoutTicketInputSchema = z.strictObject({
    where: z.lazy(() => NotificationScalarWhereInputSchema),
    data: z.union([z.lazy(() => NotificationUpdateManyMutationInputSchema), z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketInputSchema)]),
});
export const TechSupportUpsertWithoutTicketsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema)]),
    create: z.union([z.lazy(() => TechSupportCreateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedCreateWithoutTicketsInputSchema)]),
    where: z.lazy(() => TechSupportWhereInputSchema).optional(),
});
export const TechSupportUpdateToOneWithWhereWithoutTicketsInputSchema = z.strictObject({
    where: z.lazy(() => TechSupportWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TechSupportUpdateWithoutTicketsInputSchema), z.lazy(() => TechSupportUncheckedUpdateWithoutTicketsInputSchema)]),
});
export const TechSupportUpdateWithoutTicketsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutTechSupportsNestedInputSchema).optional(),
});
export const TechSupportUncheckedUpdateWithoutTicketsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCreateWithoutAttachmentsInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutAttachmentsInputSchema = z.strictObject({
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
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutAttachmentsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema)]),
});
export const TicketUpsertWithoutAttachmentsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutAttachmentsInputSchema)]),
    where: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const TicketUpdateToOneWithWhereWithoutAttachmentsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TicketUpdateWithoutAttachmentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutAttachmentsInputSchema)]),
});
export const TicketUpdateWithoutAttachmentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutAttachmentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketCreateWithoutCommentsInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutCommentsInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutCommentsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema)]),
});
export const UserCreateWithoutCommentsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutCommentsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutCommentsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema)]),
});
export const TicketUpsertWithoutCommentsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TicketUpdateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutCommentsInputSchema)]),
    where: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const TicketUpdateToOneWithWhereWithoutCommentsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TicketUpdateWithoutCommentsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutCommentsInputSchema)]),
});
export const TicketUpdateWithoutCommentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutCommentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const UserUpsertWithoutCommentsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedCreateWithoutCommentsInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutCommentsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutCommentsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCommentsInputSchema)]),
});
export const UserUpdateWithoutCommentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutCommentsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const TicketCreateWithoutHistoriesInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutHistoriesInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutHistoriesInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema)]),
});
export const UserCreateWithoutTicketHistoriesInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    notifications: z.lazy(() => NotificationCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutTicketHistoriesInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutTicketHistoriesInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema)]),
});
export const TicketUpsertWithoutHistoriesInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TicketUpdateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedCreateWithoutHistoriesInputSchema)]),
    where: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const TicketUpdateToOneWithWhereWithoutHistoriesInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TicketUpdateWithoutHistoriesInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutHistoriesInputSchema)]),
});
export const TicketUpdateWithoutHistoriesInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutHistoriesInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const UserUpsertWithoutTicketHistoriesInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedCreateWithoutTicketHistoriesInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutTicketHistoriesInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutTicketHistoriesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutTicketHistoriesInputSchema)]),
});
export const UserUpdateWithoutTicketHistoriesInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutTicketHistoriesInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserCreateWithoutNotificationsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryCreateNestedManyWithoutChangedByInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserUncheckedCreateWithoutNotificationsInputSchema = z.strictObject({
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
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedCreateNestedManyWithoutCreatorInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedCreateNestedManyWithoutAssigneeInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutAuthorInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutChangedByInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});
export const UserCreateOrConnectWithoutNotificationsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema)]),
});
export const TicketCreateWithoutNotificationsInputSchema = z.strictObject({
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
    assignee: z.lazy(() => UserCreateNestedOneWithoutTicketsAssignedToInputSchema).optional(),
    category: z.lazy(() => TicketCategoryCreateNestedOneWithoutTicketsInputSchema).optional(),
    attachments: z.lazy(() => AttachmentCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryCreateNestedManyWithoutTicketInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportCreateNestedOneWithoutTicketsInputSchema).optional(),
});
export const TicketUncheckedCreateWithoutNotificationsInputSchema = z.strictObject({
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
    attachments: z.lazy(() => AttachmentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedCreateNestedManyWithoutTicketInputSchema).optional(),
});
export const TicketCreateOrConnectWithoutNotificationsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereUniqueInputSchema),
    create: z.union([z.lazy(() => TicketCreateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema)]),
});
export const UserUpsertWithoutNotificationsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema)]),
    create: z.union([z.lazy(() => UserCreateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedCreateWithoutNotificationsInputSchema)]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
});
export const UserUpdateToOneWithWhereWithoutNotificationsInputSchema = z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([z.lazy(() => UserUpdateWithoutNotificationsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutNotificationsInputSchema)]),
});
export const UserUpdateWithoutNotificationsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUpdateManyWithoutChangedByNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const UserUncheckedUpdateWithoutNotificationsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    supabaseUid: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    username: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    passwordHash: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    role: z.union([z.lazy(() => UserRoleSchema), z.lazy(() => EnumUserRoleFieldUpdateOperationsInputSchema)]).optional(),
    fullName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    phone: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    isActive: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    lastLoginAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    passwordResetTokens: z.lazy(() => PasswordResetTokenUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
    ticketsCreated: z.lazy(() => TicketUncheckedUpdateManyWithoutCreatorNestedInputSchema).optional(),
    ticketsAssignedTo: z.lazy(() => TicketUncheckedUpdateManyWithoutAssigneeNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutAuthorNestedInputSchema).optional(),
    ticketHistories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutChangedByNestedInputSchema).optional(),
    techSupports: z.lazy(() => TechSupportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});
export const TicketUpsertWithoutNotificationsInputSchema = z.strictObject({
    update: z.union([z.lazy(() => TicketUpdateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema)]),
    create: z.union([z.lazy(() => TicketCreateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedCreateWithoutNotificationsInputSchema)]),
    where: z.lazy(() => TicketWhereInputSchema).optional(),
});
export const TicketUpdateToOneWithWhereWithoutNotificationsInputSchema = z.strictObject({
    where: z.lazy(() => TicketWhereInputSchema).optional(),
    data: z.union([z.lazy(() => TicketUpdateWithoutNotificationsInputSchema), z.lazy(() => TicketUncheckedUpdateWithoutNotificationsInputSchema)]),
});
export const TicketUpdateWithoutNotificationsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutNotificationsInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const PasswordResetTokenCreateManyUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    usedAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TicketCreateManyCreatorInputSchema = z.strictObject({
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
export const TicketCreateManyAssigneeInputSchema = z.strictObject({
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
export const TicketCommentCreateManyAuthorInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketHistoryCreateManyChangedByInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const NotificationCreateManyUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    ticketId: z.string().optional().nullable(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const TechSupportCreateManyUserInputSchema = z.strictObject({
    id: z.uuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    speciality: z.lazy(() => TechSupportSpecialtySchema).optional(),
});
export const PasswordResetTokenUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const PasswordResetTokenUncheckedUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const PasswordResetTokenUncheckedUpdateManyWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    usedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketUpdateWithoutCreatorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutCreatorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateManyWithoutCreatorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const TicketUpdateWithoutAssigneeInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutAssigneeInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateManyWithoutAssigneeInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const TicketCommentUpdateWithoutAuthorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});
export const TicketCommentUncheckedUpdateWithoutAuthorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentUncheckedUpdateManyWithoutAuthorInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryUpdateWithoutChangedByInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneRequiredWithoutHistoriesNestedInputSchema).optional(),
});
export const TicketHistoryUncheckedUpdateWithoutChangedByInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryUncheckedUpdateManyWithoutChangedByInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    ticket: z.lazy(() => TicketUpdateOneWithoutNotificationsNestedInputSchema).optional(),
});
export const NotificationUncheckedUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationUncheckedUpdateManyWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    ticketId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TechSupportUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
    tickets: z.lazy(() => TicketUpdateManyWithoutTechSupportNestedInputSchema).optional(),
});
export const TechSupportUncheckedUpdateWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
    tickets: z.lazy(() => TicketUncheckedUpdateManyWithoutTechSupportNestedInputSchema).optional(),
});
export const TechSupportUncheckedUpdateManyWithoutUserInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    speciality: z.union([z.lazy(() => TechSupportSpecialtySchema), z.lazy(() => EnumTechSupportSpecialtyFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCreateManyTechSupportInputSchema = z.strictObject({
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
export const TicketUpdateWithoutTechSupportInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    category: z.lazy(() => TicketCategoryUpdateOneWithoutTicketsNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutTechSupportInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateManyWithoutTechSupportInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    categoryId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const TicketCreateManyCategoryInputSchema = z.strictObject({
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
export const TicketUpdateWithoutCategoryInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creator: z.lazy(() => UserUpdateOneRequiredWithoutTicketsCreatedNestedInputSchema).optional(),
    assignee: z.lazy(() => UserUpdateOneWithoutTicketsAssignedToNestedInputSchema).optional(),
    attachments: z.lazy(() => AttachmentUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUpdateManyWithoutTicketNestedInputSchema).optional(),
    techSupport: z.lazy(() => TechSupportUpdateOneWithoutTicketsNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateWithoutCategoryInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    attachments: z.lazy(() => AttachmentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    comments: z.lazy(() => TicketCommentUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    histories: z.lazy(() => TicketHistoryUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
    notifications: z.lazy(() => NotificationUncheckedUpdateManyWithoutTicketNestedInputSchema).optional(),
});
export const TicketUncheckedUpdateManyWithoutCategoryInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    status: z.union([z.lazy(() => TicketStatusSchema), z.lazy(() => EnumTicketStatusFieldUpdateOperationsInputSchema)]).optional(),
    priority: z.union([z.lazy(() => TicketPrioritySchema), z.lazy(() => EnumTicketPriorityFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    resolvedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    closedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    creatorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    assigneeId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    techSupportId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
});
export const AttachmentCreateManyTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    fileName: z.string(),
    fileUrl: z.string(),
    fileSize: z.number().int(),
    mimeType: z.string(),
    source: z.lazy(() => AttachmentSourceSchema).optional(),
    uploadedAt: z.coerce.date().optional(),
});
export const TicketCommentCreateManyTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    authorId: z.string(),
    body: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
});
export const TicketHistoryCreateManyTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    changedById: z.string(),
    field: z.string(),
    oldValue: z.string().optional().nullable(),
    newValue: z.string().optional().nullable(),
    note: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const NotificationCreateManyTicketInputSchema = z.strictObject({
    id: z.uuid().optional(),
    userId: z.string(),
    type: z.lazy(() => NotificationTypeSchema),
    title: z.string(),
    body: z.string(),
    isRead: z.boolean().optional(),
    readAt: z.coerce.date().optional().nullable(),
    createdAt: z.coerce.date().optional(),
});
export const AttachmentUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const AttachmentUncheckedUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const AttachmentUncheckedUpdateManyWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileName: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileUrl: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    fileSize: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
    mimeType: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    source: z.union([z.lazy(() => AttachmentSourceSchema), z.lazy(() => EnumAttachmentSourceFieldUpdateOperationsInputSchema)]).optional(),
    uploadedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    author: z.lazy(() => UserUpdateOneRequiredWithoutCommentsNestedInputSchema).optional(),
});
export const TicketCommentUncheckedUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketCommentUncheckedUpdateManyWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    authorId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    changedBy: z.lazy(() => UserUpdateOneRequiredWithoutTicketHistoriesNestedInputSchema).optional(),
});
export const TicketHistoryUncheckedUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    changedById: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const TicketHistoryUncheckedUpdateManyWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    changedById: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    field: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    oldValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    newValue: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
    user: z.lazy(() => UserUpdateOneRequiredWithoutNotificationsNestedInputSchema).optional(),
});
export const NotificationUncheckedUpdateWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
export const NotificationUncheckedUpdateManyWithoutTicketInputSchema = z.strictObject({
    id: z.union([z.uuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    type: z.union([z.lazy(() => NotificationTypeSchema), z.lazy(() => EnumNotificationTypeFieldUpdateOperationsInputSchema)]).optional(),
    title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    body: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
    isRead: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
    readAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
    createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
});
/////////////////////////////////////////
// ARGS
/////////////////////////////////////////
export const UserFindFirstArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const UserFindFirstOrThrowArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const UserFindManyArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const UserAggregateArgsSchema = z.object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const UserGroupByArgsSchema = z.object({
    where: UserWhereInputSchema.optional(),
    orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const UserFindUniqueArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
}).strict();
export const UserFindUniqueOrThrowArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
}).strict();
export const TechSupportFindFirstArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereInputSchema.optional(),
    orderBy: z.union([TechSupportOrderByWithRelationInputSchema.array(), TechSupportOrderByWithRelationInputSchema]).optional(),
    cursor: TechSupportWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechSupportScalarFieldEnumSchema, TechSupportScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TechSupportFindFirstOrThrowArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereInputSchema.optional(),
    orderBy: z.union([TechSupportOrderByWithRelationInputSchema.array(), TechSupportOrderByWithRelationInputSchema]).optional(),
    cursor: TechSupportWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechSupportScalarFieldEnumSchema, TechSupportScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TechSupportFindManyArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereInputSchema.optional(),
    orderBy: z.union([TechSupportOrderByWithRelationInputSchema.array(), TechSupportOrderByWithRelationInputSchema]).optional(),
    cursor: TechSupportWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TechSupportScalarFieldEnumSchema, TechSupportScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TechSupportAggregateArgsSchema = z.object({
    where: TechSupportWhereInputSchema.optional(),
    orderBy: z.union([TechSupportOrderByWithRelationInputSchema.array(), TechSupportOrderByWithRelationInputSchema]).optional(),
    cursor: TechSupportWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TechSupportGroupByArgsSchema = z.object({
    where: TechSupportWhereInputSchema.optional(),
    orderBy: z.union([TechSupportOrderByWithAggregationInputSchema.array(), TechSupportOrderByWithAggregationInputSchema]).optional(),
    by: TechSupportScalarFieldEnumSchema.array(),
    having: TechSupportScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TechSupportFindUniqueArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereUniqueInputSchema,
}).strict();
export const TechSupportFindUniqueOrThrowArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereUniqueInputSchema,
}).strict();
export const PasswordResetTokenFindFirstArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereInputSchema.optional(),
    orderBy: z.union([PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema]).optional(),
    cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const PasswordResetTokenFindFirstOrThrowArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereInputSchema.optional(),
    orderBy: z.union([PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema]).optional(),
    cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const PasswordResetTokenFindManyArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereInputSchema.optional(),
    orderBy: z.union([PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema]).optional(),
    cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([PasswordResetTokenScalarFieldEnumSchema, PasswordResetTokenScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const PasswordResetTokenAggregateArgsSchema = z.object({
    where: PasswordResetTokenWhereInputSchema.optional(),
    orderBy: z.union([PasswordResetTokenOrderByWithRelationInputSchema.array(), PasswordResetTokenOrderByWithRelationInputSchema]).optional(),
    cursor: PasswordResetTokenWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const PasswordResetTokenGroupByArgsSchema = z.object({
    where: PasswordResetTokenWhereInputSchema.optional(),
    orderBy: z.union([PasswordResetTokenOrderByWithAggregationInputSchema.array(), PasswordResetTokenOrderByWithAggregationInputSchema]).optional(),
    by: PasswordResetTokenScalarFieldEnumSchema.array(),
    having: PasswordResetTokenScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const PasswordResetTokenFindUniqueArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereUniqueInputSchema,
}).strict();
export const PasswordResetTokenFindUniqueOrThrowArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereUniqueInputSchema,
}).strict();
export const TicketCategoryFindFirstArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereInputSchema.optional(),
    orderBy: z.union([TicketCategoryOrderByWithRelationInputSchema.array(), TicketCategoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCategoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCategoryScalarFieldEnumSchema, TicketCategoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCategoryFindFirstOrThrowArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereInputSchema.optional(),
    orderBy: z.union([TicketCategoryOrderByWithRelationInputSchema.array(), TicketCategoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCategoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCategoryScalarFieldEnumSchema, TicketCategoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCategoryFindManyArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereInputSchema.optional(),
    orderBy: z.union([TicketCategoryOrderByWithRelationInputSchema.array(), TicketCategoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCategoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCategoryScalarFieldEnumSchema, TicketCategoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCategoryAggregateArgsSchema = z.object({
    where: TicketCategoryWhereInputSchema.optional(),
    orderBy: z.union([TicketCategoryOrderByWithRelationInputSchema.array(), TicketCategoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCategoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketCategoryGroupByArgsSchema = z.object({
    where: TicketCategoryWhereInputSchema.optional(),
    orderBy: z.union([TicketCategoryOrderByWithAggregationInputSchema.array(), TicketCategoryOrderByWithAggregationInputSchema]).optional(),
    by: TicketCategoryScalarFieldEnumSchema.array(),
    having: TicketCategoryScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketCategoryFindUniqueArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereUniqueInputSchema,
}).strict();
export const TicketCategoryFindUniqueOrThrowArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereUniqueInputSchema,
}).strict();
export const TicketFindFirstArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereInputSchema.optional(),
    orderBy: z.union([TicketOrderByWithRelationInputSchema.array(), TicketOrderByWithRelationInputSchema]).optional(),
    cursor: TicketWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketScalarFieldEnumSchema, TicketScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketFindFirstOrThrowArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereInputSchema.optional(),
    orderBy: z.union([TicketOrderByWithRelationInputSchema.array(), TicketOrderByWithRelationInputSchema]).optional(),
    cursor: TicketWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketScalarFieldEnumSchema, TicketScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketFindManyArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereInputSchema.optional(),
    orderBy: z.union([TicketOrderByWithRelationInputSchema.array(), TicketOrderByWithRelationInputSchema]).optional(),
    cursor: TicketWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketScalarFieldEnumSchema, TicketScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketAggregateArgsSchema = z.object({
    where: TicketWhereInputSchema.optional(),
    orderBy: z.union([TicketOrderByWithRelationInputSchema.array(), TicketOrderByWithRelationInputSchema]).optional(),
    cursor: TicketWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketGroupByArgsSchema = z.object({
    where: TicketWhereInputSchema.optional(),
    orderBy: z.union([TicketOrderByWithAggregationInputSchema.array(), TicketOrderByWithAggregationInputSchema]).optional(),
    by: TicketScalarFieldEnumSchema.array(),
    having: TicketScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketFindUniqueArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
}).strict();
export const TicketFindUniqueOrThrowArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
}).strict();
export const AttachmentFindFirstArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereInputSchema.optional(),
    orderBy: z.union([AttachmentOrderByWithRelationInputSchema.array(), AttachmentOrderByWithRelationInputSchema]).optional(),
    cursor: AttachmentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AttachmentScalarFieldEnumSchema, AttachmentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const AttachmentFindFirstOrThrowArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereInputSchema.optional(),
    orderBy: z.union([AttachmentOrderByWithRelationInputSchema.array(), AttachmentOrderByWithRelationInputSchema]).optional(),
    cursor: AttachmentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AttachmentScalarFieldEnumSchema, AttachmentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const AttachmentFindManyArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereInputSchema.optional(),
    orderBy: z.union([AttachmentOrderByWithRelationInputSchema.array(), AttachmentOrderByWithRelationInputSchema]).optional(),
    cursor: AttachmentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([AttachmentScalarFieldEnumSchema, AttachmentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const AttachmentAggregateArgsSchema = z.object({
    where: AttachmentWhereInputSchema.optional(),
    orderBy: z.union([AttachmentOrderByWithRelationInputSchema.array(), AttachmentOrderByWithRelationInputSchema]).optional(),
    cursor: AttachmentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const AttachmentGroupByArgsSchema = z.object({
    where: AttachmentWhereInputSchema.optional(),
    orderBy: z.union([AttachmentOrderByWithAggregationInputSchema.array(), AttachmentOrderByWithAggregationInputSchema]).optional(),
    by: AttachmentScalarFieldEnumSchema.array(),
    having: AttachmentScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const AttachmentFindUniqueArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereUniqueInputSchema,
}).strict();
export const AttachmentFindUniqueOrThrowArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereUniqueInputSchema,
}).strict();
export const TicketCommentFindFirstArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereInputSchema.optional(),
    orderBy: z.union([TicketCommentOrderByWithRelationInputSchema.array(), TicketCommentOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCommentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCommentScalarFieldEnumSchema, TicketCommentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCommentFindFirstOrThrowArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereInputSchema.optional(),
    orderBy: z.union([TicketCommentOrderByWithRelationInputSchema.array(), TicketCommentOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCommentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCommentScalarFieldEnumSchema, TicketCommentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCommentFindManyArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereInputSchema.optional(),
    orderBy: z.union([TicketCommentOrderByWithRelationInputSchema.array(), TicketCommentOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCommentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketCommentScalarFieldEnumSchema, TicketCommentScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketCommentAggregateArgsSchema = z.object({
    where: TicketCommentWhereInputSchema.optional(),
    orderBy: z.union([TicketCommentOrderByWithRelationInputSchema.array(), TicketCommentOrderByWithRelationInputSchema]).optional(),
    cursor: TicketCommentWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketCommentGroupByArgsSchema = z.object({
    where: TicketCommentWhereInputSchema.optional(),
    orderBy: z.union([TicketCommentOrderByWithAggregationInputSchema.array(), TicketCommentOrderByWithAggregationInputSchema]).optional(),
    by: TicketCommentScalarFieldEnumSchema.array(),
    having: TicketCommentScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketCommentFindUniqueArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereUniqueInputSchema,
}).strict();
export const TicketCommentFindUniqueOrThrowArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereUniqueInputSchema,
}).strict();
export const TicketHistoryFindFirstArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereInputSchema.optional(),
    orderBy: z.union([TicketHistoryOrderByWithRelationInputSchema.array(), TicketHistoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketHistoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketHistoryScalarFieldEnumSchema, TicketHistoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketHistoryFindFirstOrThrowArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereInputSchema.optional(),
    orderBy: z.union([TicketHistoryOrderByWithRelationInputSchema.array(), TicketHistoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketHistoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketHistoryScalarFieldEnumSchema, TicketHistoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketHistoryFindManyArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereInputSchema.optional(),
    orderBy: z.union([TicketHistoryOrderByWithRelationInputSchema.array(), TicketHistoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketHistoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([TicketHistoryScalarFieldEnumSchema, TicketHistoryScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const TicketHistoryAggregateArgsSchema = z.object({
    where: TicketHistoryWhereInputSchema.optional(),
    orderBy: z.union([TicketHistoryOrderByWithRelationInputSchema.array(), TicketHistoryOrderByWithRelationInputSchema]).optional(),
    cursor: TicketHistoryWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketHistoryGroupByArgsSchema = z.object({
    where: TicketHistoryWhereInputSchema.optional(),
    orderBy: z.union([TicketHistoryOrderByWithAggregationInputSchema.array(), TicketHistoryOrderByWithAggregationInputSchema]).optional(),
    by: TicketHistoryScalarFieldEnumSchema.array(),
    having: TicketHistoryScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const TicketHistoryFindUniqueArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereUniqueInputSchema,
}).strict();
export const TicketHistoryFindUniqueOrThrowArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereUniqueInputSchema,
}).strict();
export const NotificationFindFirstArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereInputSchema.optional(),
    orderBy: z.union([NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema]).optional(),
    cursor: NotificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const NotificationFindFirstOrThrowArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereInputSchema.optional(),
    orderBy: z.union([NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema]).optional(),
    cursor: NotificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const NotificationFindManyArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereInputSchema.optional(),
    orderBy: z.union([NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema]).optional(),
    cursor: NotificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z.union([NotificationScalarFieldEnumSchema, NotificationScalarFieldEnumSchema.array()]).optional(),
}).strict();
export const NotificationAggregateArgsSchema = z.object({
    where: NotificationWhereInputSchema.optional(),
    orderBy: z.union([NotificationOrderByWithRelationInputSchema.array(), NotificationOrderByWithRelationInputSchema]).optional(),
    cursor: NotificationWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const NotificationGroupByArgsSchema = z.object({
    where: NotificationWhereInputSchema.optional(),
    orderBy: z.union([NotificationOrderByWithAggregationInputSchema.array(), NotificationOrderByWithAggregationInputSchema]).optional(),
    by: NotificationScalarFieldEnumSchema.array(),
    having: NotificationScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
}).strict();
export const NotificationFindUniqueArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereUniqueInputSchema,
}).strict();
export const NotificationFindUniqueOrThrowArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereUniqueInputSchema,
}).strict();
export const UserCreateArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
}).strict();
export const UserUpsertArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
}).strict();
export const UserCreateManyArgsSchema = z.object({
    data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const UserCreateManyAndReturnArgsSchema = z.object({
    data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const UserDeleteArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
}).strict();
export const UserUpdateArgsSchema = z.object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
}).strict();
export const UserUpdateManyArgsSchema = z.object({
    data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const UserUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const UserDeleteManyArgsSchema = z.object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TechSupportCreateArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    data: z.union([TechSupportCreateInputSchema, TechSupportUncheckedCreateInputSchema]),
}).strict();
export const TechSupportUpsertArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereUniqueInputSchema,
    create: z.union([TechSupportCreateInputSchema, TechSupportUncheckedCreateInputSchema]),
    update: z.union([TechSupportUpdateInputSchema, TechSupportUncheckedUpdateInputSchema]),
}).strict();
export const TechSupportCreateManyArgsSchema = z.object({
    data: z.union([TechSupportCreateManyInputSchema, TechSupportCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TechSupportCreateManyAndReturnArgsSchema = z.object({
    data: z.union([TechSupportCreateManyInputSchema, TechSupportCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TechSupportDeleteArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    where: TechSupportWhereUniqueInputSchema,
}).strict();
export const TechSupportUpdateArgsSchema = z.object({
    select: TechSupportSelectSchema.optional(),
    include: TechSupportIncludeSchema.optional(),
    data: z.union([TechSupportUpdateInputSchema, TechSupportUncheckedUpdateInputSchema]),
    where: TechSupportWhereUniqueInputSchema,
}).strict();
export const TechSupportUpdateManyArgsSchema = z.object({
    data: z.union([TechSupportUpdateManyMutationInputSchema, TechSupportUncheckedUpdateManyInputSchema]),
    where: TechSupportWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TechSupportUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([TechSupportUpdateManyMutationInputSchema, TechSupportUncheckedUpdateManyInputSchema]),
    where: TechSupportWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TechSupportDeleteManyArgsSchema = z.object({
    where: TechSupportWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const PasswordResetTokenCreateArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    data: z.union([PasswordResetTokenCreateInputSchema, PasswordResetTokenUncheckedCreateInputSchema]),
}).strict();
export const PasswordResetTokenUpsertArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereUniqueInputSchema,
    create: z.union([PasswordResetTokenCreateInputSchema, PasswordResetTokenUncheckedCreateInputSchema]),
    update: z.union([PasswordResetTokenUpdateInputSchema, PasswordResetTokenUncheckedUpdateInputSchema]),
}).strict();
export const PasswordResetTokenCreateManyArgsSchema = z.object({
    data: z.union([PasswordResetTokenCreateManyInputSchema, PasswordResetTokenCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const PasswordResetTokenCreateManyAndReturnArgsSchema = z.object({
    data: z.union([PasswordResetTokenCreateManyInputSchema, PasswordResetTokenCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const PasswordResetTokenDeleteArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    where: PasswordResetTokenWhereUniqueInputSchema,
}).strict();
export const PasswordResetTokenUpdateArgsSchema = z.object({
    select: PasswordResetTokenSelectSchema.optional(),
    include: PasswordResetTokenIncludeSchema.optional(),
    data: z.union([PasswordResetTokenUpdateInputSchema, PasswordResetTokenUncheckedUpdateInputSchema]),
    where: PasswordResetTokenWhereUniqueInputSchema,
}).strict();
export const PasswordResetTokenUpdateManyArgsSchema = z.object({
    data: z.union([PasswordResetTokenUpdateManyMutationInputSchema, PasswordResetTokenUncheckedUpdateManyInputSchema]),
    where: PasswordResetTokenWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const PasswordResetTokenUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([PasswordResetTokenUpdateManyMutationInputSchema, PasswordResetTokenUncheckedUpdateManyInputSchema]),
    where: PasswordResetTokenWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const PasswordResetTokenDeleteManyArgsSchema = z.object({
    where: PasswordResetTokenWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCategoryCreateArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    data: z.union([TicketCategoryCreateInputSchema, TicketCategoryUncheckedCreateInputSchema]),
}).strict();
export const TicketCategoryUpsertArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereUniqueInputSchema,
    create: z.union([TicketCategoryCreateInputSchema, TicketCategoryUncheckedCreateInputSchema]),
    update: z.union([TicketCategoryUpdateInputSchema, TicketCategoryUncheckedUpdateInputSchema]),
}).strict();
export const TicketCategoryCreateManyArgsSchema = z.object({
    data: z.union([TicketCategoryCreateManyInputSchema, TicketCategoryCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketCategoryCreateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketCategoryCreateManyInputSchema, TicketCategoryCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketCategoryDeleteArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    where: TicketCategoryWhereUniqueInputSchema,
}).strict();
export const TicketCategoryUpdateArgsSchema = z.object({
    select: TicketCategorySelectSchema.optional(),
    include: TicketCategoryIncludeSchema.optional(),
    data: z.union([TicketCategoryUpdateInputSchema, TicketCategoryUncheckedUpdateInputSchema]),
    where: TicketCategoryWhereUniqueInputSchema,
}).strict();
export const TicketCategoryUpdateManyArgsSchema = z.object({
    data: z.union([TicketCategoryUpdateManyMutationInputSchema, TicketCategoryUncheckedUpdateManyInputSchema]),
    where: TicketCategoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCategoryUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketCategoryUpdateManyMutationInputSchema, TicketCategoryUncheckedUpdateManyInputSchema]),
    where: TicketCategoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCategoryDeleteManyArgsSchema = z.object({
    where: TicketCategoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCreateArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    data: z.union([TicketCreateInputSchema, TicketUncheckedCreateInputSchema]),
}).strict();
export const TicketUpsertArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
    create: z.union([TicketCreateInputSchema, TicketUncheckedCreateInputSchema]),
    update: z.union([TicketUpdateInputSchema, TicketUncheckedUpdateInputSchema]),
}).strict();
export const TicketCreateManyArgsSchema = z.object({
    data: z.union([TicketCreateManyInputSchema, TicketCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketCreateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketCreateManyInputSchema, TicketCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketDeleteArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
}).strict();
export const TicketUpdateArgsSchema = z.object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    data: z.union([TicketUpdateInputSchema, TicketUncheckedUpdateInputSchema]),
    where: TicketWhereUniqueInputSchema,
}).strict();
export const TicketUpdateManyArgsSchema = z.object({
    data: z.union([TicketUpdateManyMutationInputSchema, TicketUncheckedUpdateManyInputSchema]),
    where: TicketWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketUpdateManyMutationInputSchema, TicketUncheckedUpdateManyInputSchema]),
    where: TicketWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketDeleteManyArgsSchema = z.object({
    where: TicketWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const AttachmentCreateArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    data: z.union([AttachmentCreateInputSchema, AttachmentUncheckedCreateInputSchema]),
}).strict();
export const AttachmentUpsertArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereUniqueInputSchema,
    create: z.union([AttachmentCreateInputSchema, AttachmentUncheckedCreateInputSchema]),
    update: z.union([AttachmentUpdateInputSchema, AttachmentUncheckedUpdateInputSchema]),
}).strict();
export const AttachmentCreateManyArgsSchema = z.object({
    data: z.union([AttachmentCreateManyInputSchema, AttachmentCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const AttachmentCreateManyAndReturnArgsSchema = z.object({
    data: z.union([AttachmentCreateManyInputSchema, AttachmentCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const AttachmentDeleteArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    where: AttachmentWhereUniqueInputSchema,
}).strict();
export const AttachmentUpdateArgsSchema = z.object({
    select: AttachmentSelectSchema.optional(),
    include: AttachmentIncludeSchema.optional(),
    data: z.union([AttachmentUpdateInputSchema, AttachmentUncheckedUpdateInputSchema]),
    where: AttachmentWhereUniqueInputSchema,
}).strict();
export const AttachmentUpdateManyArgsSchema = z.object({
    data: z.union([AttachmentUpdateManyMutationInputSchema, AttachmentUncheckedUpdateManyInputSchema]),
    where: AttachmentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const AttachmentUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([AttachmentUpdateManyMutationInputSchema, AttachmentUncheckedUpdateManyInputSchema]),
    where: AttachmentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const AttachmentDeleteManyArgsSchema = z.object({
    where: AttachmentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCommentCreateArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    data: z.union([TicketCommentCreateInputSchema, TicketCommentUncheckedCreateInputSchema]),
}).strict();
export const TicketCommentUpsertArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereUniqueInputSchema,
    create: z.union([TicketCommentCreateInputSchema, TicketCommentUncheckedCreateInputSchema]),
    update: z.union([TicketCommentUpdateInputSchema, TicketCommentUncheckedUpdateInputSchema]),
}).strict();
export const TicketCommentCreateManyArgsSchema = z.object({
    data: z.union([TicketCommentCreateManyInputSchema, TicketCommentCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketCommentCreateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketCommentCreateManyInputSchema, TicketCommentCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketCommentDeleteArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    where: TicketCommentWhereUniqueInputSchema,
}).strict();
export const TicketCommentUpdateArgsSchema = z.object({
    select: TicketCommentSelectSchema.optional(),
    include: TicketCommentIncludeSchema.optional(),
    data: z.union([TicketCommentUpdateInputSchema, TicketCommentUncheckedUpdateInputSchema]),
    where: TicketCommentWhereUniqueInputSchema,
}).strict();
export const TicketCommentUpdateManyArgsSchema = z.object({
    data: z.union([TicketCommentUpdateManyMutationInputSchema, TicketCommentUncheckedUpdateManyInputSchema]),
    where: TicketCommentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCommentUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketCommentUpdateManyMutationInputSchema, TicketCommentUncheckedUpdateManyInputSchema]),
    where: TicketCommentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketCommentDeleteManyArgsSchema = z.object({
    where: TicketCommentWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketHistoryCreateArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    data: z.union([TicketHistoryCreateInputSchema, TicketHistoryUncheckedCreateInputSchema]),
}).strict();
export const TicketHistoryUpsertArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereUniqueInputSchema,
    create: z.union([TicketHistoryCreateInputSchema, TicketHistoryUncheckedCreateInputSchema]),
    update: z.union([TicketHistoryUpdateInputSchema, TicketHistoryUncheckedUpdateInputSchema]),
}).strict();
export const TicketHistoryCreateManyArgsSchema = z.object({
    data: z.union([TicketHistoryCreateManyInputSchema, TicketHistoryCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketHistoryCreateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketHistoryCreateManyInputSchema, TicketHistoryCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const TicketHistoryDeleteArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    where: TicketHistoryWhereUniqueInputSchema,
}).strict();
export const TicketHistoryUpdateArgsSchema = z.object({
    select: TicketHistorySelectSchema.optional(),
    include: TicketHistoryIncludeSchema.optional(),
    data: z.union([TicketHistoryUpdateInputSchema, TicketHistoryUncheckedUpdateInputSchema]),
    where: TicketHistoryWhereUniqueInputSchema,
}).strict();
export const TicketHistoryUpdateManyArgsSchema = z.object({
    data: z.union([TicketHistoryUpdateManyMutationInputSchema, TicketHistoryUncheckedUpdateManyInputSchema]),
    where: TicketHistoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketHistoryUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([TicketHistoryUpdateManyMutationInputSchema, TicketHistoryUncheckedUpdateManyInputSchema]),
    where: TicketHistoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const TicketHistoryDeleteManyArgsSchema = z.object({
    where: TicketHistoryWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const NotificationCreateArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    data: z.union([NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema]),
}).strict();
export const NotificationUpsertArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereUniqueInputSchema,
    create: z.union([NotificationCreateInputSchema, NotificationUncheckedCreateInputSchema]),
    update: z.union([NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema]),
}).strict();
export const NotificationCreateManyArgsSchema = z.object({
    data: z.union([NotificationCreateManyInputSchema, NotificationCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const NotificationCreateManyAndReturnArgsSchema = z.object({
    data: z.union([NotificationCreateManyInputSchema, NotificationCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
}).strict();
export const NotificationDeleteArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    where: NotificationWhereUniqueInputSchema,
}).strict();
export const NotificationUpdateArgsSchema = z.object({
    select: NotificationSelectSchema.optional(),
    include: NotificationIncludeSchema.optional(),
    data: z.union([NotificationUpdateInputSchema, NotificationUncheckedUpdateInputSchema]),
    where: NotificationWhereUniqueInputSchema,
}).strict();
export const NotificationUpdateManyArgsSchema = z.object({
    data: z.union([NotificationUpdateManyMutationInputSchema, NotificationUncheckedUpdateManyInputSchema]),
    where: NotificationWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const NotificationUpdateManyAndReturnArgsSchema = z.object({
    data: z.union([NotificationUpdateManyMutationInputSchema, NotificationUncheckedUpdateManyInputSchema]),
    where: NotificationWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
export const NotificationDeleteManyArgsSchema = z.object({
    where: NotificationWhereInputSchema.optional(),
    limit: z.number().optional(),
}).strict();
