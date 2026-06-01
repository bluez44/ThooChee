/**
 * Data Transfer Objects (DTOs) for the Smart Voice Expense Manager.
 * These types define the schema for client-backend request/response payloads.
 */

// ==========================================
// 1. Transaction DTOs
// ==========================================

export type TransactionType = "income" | "expense";

/**
 * Representation of a transaction returned by the Backend APIs.
 */
export interface TransactionDTO {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO 8601 YYYY-MM-DD
  notes: string | null;
  userId: string;
  createdAt: string; // ISO 8601 DateTime string
  updatedAt: string; // ISO 8601 DateTime string
}

/**
 * Request payload for creating a transaction.
 */
export interface CreateTransactionDTO {
  title: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // YYYY-MM-DD
  notes?: string | null;
}

/**
 * Request payload for modifying a transaction.
 */
export interface UpdateTransactionDTO {
  title?: string;
  amount?: number;
  type?: TransactionType;
  category?: string;
  date?: string;
  notes?: string | null;
}

/**
 * Response payload for fetching paginated lists of ledger entries.
 */
export interface TransactionListResponseDTO {
  transactions: TransactionDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==========================================
// 2. Voice Input & Natural Language Parsing
// ==========================================

/**
 * Request payload to parse spoken/typed natural language statements.
 */
export interface VoiceParseRequestDTO {
  text: string;
  /** Browser or device timezone offset in minutes to help parse relative dates like "yesterday" or "today" correctly */
  timezoneOffset?: number; 
}

/**
 * Response returned by the AI parsing backend.
 */
export interface VoiceParseResponseDTO {
  success: boolean;
  /** High confidence parsing model values ready for validation & entry */
  data: CreateTransactionDTO | null;
  /** Confidence score between 0.0 and 1.0 */
  confidence: number;
  /** Transcribed or input raw query string */
  rawText: string;
  /** Optional matching category suggestions */
  suggestedCategories?: string[];
}

// ==========================================
// 3. Budget Targets
// ==========================================

/**
 * Representation of a user budget limit target.
 */
export interface BudgetDTO {
  userId: string;
  monthlyLimit: number;
  currency: string; // e.g. "USD", "VND"
  updatedAt: string;
}

/**
 * Request payload to change monthly budget targets.
 */
export interface UpdateBudgetDTO {
  monthlyLimit: number;
}

// ==========================================
// 4. User Profiles & System Settings
// ==========================================

/**
 * User record data mapping settings.
 */
export interface UserProfileDTO {
  id: string;
  email: string;
  name: string;
  notificationsEnabled: boolean;
  biometricsEnabled: boolean;
  localSyncEnabled: boolean;
  createdAt: string;
}

/**
 * Request payload to update preferences.
 */
export interface UpdateUserProfileDTO {
  name?: string;
  notificationsEnabled?: boolean;
  biometricsEnabled?: boolean;
  localSyncEnabled?: boolean;
}
