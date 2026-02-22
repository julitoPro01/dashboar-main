-- CreateEnum
CREATE TYPE "ConfigDataType" AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'JSON', 'ARRAY');

-- CreateEnum
CREATE TYPE "LogLevelType" AS ENUM ('DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('SUPER_ADMIN', 'SYSTEM_ADMIN', 'PLATFORM_ADMIN', 'PLATFORM_MANAGER', 'SUPPLIER_ADMIN', 'SUPPLIER_MANAGER', 'SUPPLIER_SALES', 'SUPPLIER_INVENTORY', 'SUPPLIER_SUPPORT', 'SUPPLIER_FINANCE', 'STORE_OWNER', 'STORE_MANAGER', 'STORE_STAFF', 'STORE_CASHIER', 'STORE_INVENTORY', 'CUSTOMER', 'VIP_CUSTOMER', 'SUPPORT_AGENT', 'WAREHOUSE_MANAGER', 'WAREHOUSE_STAFF', 'MARKETING_MANAGER', 'MARKETING_AGENT', 'AFFILIATE', 'GUEST');

-- CreateEnum
CREATE TYPE "AuthMethodType" AS ENUM ('EMAIL', 'GOOGLE', 'FACEBOOK', 'APPLE', 'PHONE');

-- CreateEnum
CREATE TYPE "RecordStatusType" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "SaleStatusType" AS ENUM ('AVAILABLE', 'COMING_SOON', 'DISCONTINUED', 'MADE_TO_ORDER');

-- CreateEnum
CREATE TYPE "InventoryStatusType" AS ENUM ('IN_STOCK', 'OUT_OF_STOCK', 'PENDING_RESTOCK', 'IN_TRANSIT', 'RESERVED');

-- CreateEnum
CREATE TYPE "ProductTag" AS ENUM ('ON_SALE', 'NEW', 'POPULAR', 'LOW_STOCK', 'IN_STORE_ONLY');

-- CreateEnum
CREATE TYPE "AttributeDataType" AS ENUM ('VARCHAR', 'INT', 'DECIMAL', 'BOOLEAN', 'DATE');

-- CreateEnum
CREATE TYPE "StockMovementType" AS ENUM ('IN', 'OUT', 'RETURN', 'ADJUSTMENT', 'DAMAGED', 'RESERVED', 'RELEASED');

-- CreateEnum
CREATE TYPE "ShippingStatus" AS ENUM ('PENDING', 'PREPARING', 'IN_TRANSIT', 'DELIVERED', 'RETURNED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "ShippingEvent" AS ENUM ('RECEIVED_AGENCY', 'DEPARTED_AGENCY', 'ARRIVED_DESTINATION_AGENCY', 'IN_TRANSIT_AGENCY', 'DELIVERED_LOCAL');

-- CreateEnum
CREATE TYPE "ShippingMethodType" AS ENUM ('STANDARD_HOME_DELIVERY', 'EXPRESS_HOME_DELIVERY', 'SAME_DAY_DELIVERY', 'NIGHT_DELIVERY', 'SCHEDULED_DELIVERY', 'STORE_PICKUP', 'PICKUP_POINT', 'WAREHOUSE_PICKUP', 'INTERNATIONAL', 'DIGITAL', 'CUSTOM_SHIPPING', 'SUBSCRIPTION_SHIPPING', 'EVENT_SCHEDULED_SHIPPING', 'ECO_SHIPPING');

-- CreateEnum
CREATE TYPE "ShippingTimeStatus" AS ENUM ('ACTIVE', 'UNDER_REVIEW', 'SUSPENDED', 'EXPIRED', 'SCHEDULED', 'DISCONTINUED', 'REPLACED');

-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('PENDING_PAYMENT', 'PAYMENT_VERIFICATION', 'PAID', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "ReturnStatusType" AS ENUM ('REQUESTED', 'APPROVED', 'REJECTED', 'IN_TRANSIT', 'RECEIVED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "RefundStatusType" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "InvoiceStatusType" AS ENUM ('PENDING_ISSUANCE', 'ISSUED', 'SENT_TO_AUTHORITY', 'ACCEPTED_BY_AUTHORITY', 'REJECTED_BY_AUTHORITY', 'CANCELLED', 'REPLACED');

-- CreateEnum
CREATE TYPE "InvoiceCustomerStatus" AS ENUM ('VISIBLE', 'DOWNLOADED', 'UNDER_REVIEW', 'RETURNED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('WHATSAPP', 'YAPE', 'PLIN', 'CARD', 'PAYPAL', 'CASH');

-- CreateEnum
CREATE TYPE "SupplierRelationMode" AS ENUM ('OWNED', 'PARTNER', 'CATALOG');

-- CreateEnum
CREATE TYPE "SupplierCapability" AS ENUM ('PRODUCT_MANUFACTURING', 'PRODUCT_DISTRIBUTION', 'WHOLESALE', 'RETAIL', 'SERVICE_PROVISION');

-- CreateEnum
CREATE TYPE "SupplierOperationalStatus" AS ENUM ('NORMAL', 'SUSPENDED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "SupplierContactRole" AS ENUM ('SALES', 'SUPPORT', 'LOGISTICS', 'BILLING', 'LEGAL', 'GENERAL');

-- CreateEnum
CREATE TYPE "VerificationStatusType" AS ENUM ('APPROVED', 'PENDING_REVIEW', 'UNDER_REVIEW', 'REJECTED', 'SUSPENDED', 'ARCHIVED', 'DRAFT');

-- CreateEnum
CREATE TYPE "PromotionStatusType" AS ENUM ('DRAFT', 'SCHEDULED', 'ACTIVE', 'PAUSED', 'EXPIRED', 'USED_UP', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING', 'COMBO');

-- CreateEnum
CREATE TYPE "JobStatusType" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "system_config" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "dataType" "ConfigDataType" NOT NULL,
    "isEncrypted" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "system_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "targetUsers" JSONB,
    "percentage" INTEGER,
    "conditions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "level" "LogLevelType" NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" INTEGER,
    "action" TEXT NOT NULL,
    "previousData" JSONB,
    "newData" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "system_cache" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(500) NOT NULL,
    "value" JSONB NOT NULL,
    "expiresA" TIMESTAMP(3) NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER,

    CONSTRAINT "system_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" SERIAL NOT NULL,
    "legalName" TEXT,
    "commercialName" TEXT,
    "taxId" TEXT,
    "fiscalAddress" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "logoUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "documentType" TEXT,
    "documentNumber" TEXT,
    "publicId" TEXT NOT NULL,
    "profilePicture" TEXT,
    "lastOrderDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_authentications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "supplierUserId" INTEGER,
    "verificationStatusId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "passwordHash" TEXT NOT NULL,
    "failedAttempts" INTEGER DEFAULT 0,
    "authMethod" "AuthMethodType" NOT NULL,
    "primaryRole" "RoleType" NOT NULL,
    "verificationToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "recordStatusId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "user_authentications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" SERIAL NOT NULL,
    "authId" INTEGER NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivity" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isOnline" BOOLEAN NOT NULL DEFAULT true,
    "ipAddress" TEXT,
    "device" TEXT,
    "browser" TEXT,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_preferences" (
    "userId" INTEGER NOT NULL,
    "preferredPaymentMethod" TEXT,
    "notificationPreferences" BOOLEAN DEFAULT true,
    "preferredSize" TEXT,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" "RoleType" NOT NULL,
    "description" TEXT,
    "level" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "authId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("authId","roleId")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "roleId" INTEGER NOT NULL,
    "permissionId" INTEGER NOT NULL,
    "conditions" JSONB,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("roleId","permissionId")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "country" TEXT,
    "addressLine" TEXT,
    "department" TEXT,
    "province" TEXT,
    "district" TEXT,
    "phone" TEXT,
    "type" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "documentType" TEXT,
    "documentNumber" TEXT,
    "postalCode" TEXT,
    "isDefault" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "exchangeRate" DECIMAL(10,4) NOT NULL DEFAULT 1.0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "createdById" INTEGER,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "verificationStatusId" INTEGER NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,
    "lastCategoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "parentSku" TEXT NOT NULL,
    "longDescription" VARCHAR(500),
    "shortDescription" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "currencyId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "recordStatusId" INTEGER NOT NULL,
    "saleStatusId" INTEGER NOT NULL,
    "inventoryStatusId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "stockQuantity" INTEGER NOT NULL,
    "minStock" INTEGER,
    "price" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "isMainVariant" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "tags" "ProductTag"[] DEFAULT ARRAY[]::"ProductTag"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "recordStatusId" INTEGER NOT NULL,
    "saleStatusId" INTEGER NOT NULL,
    "inventoryStatusId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "record_status" (
    "id" INTEGER NOT NULL,
    "name" "RecordStatusType" NOT NULL,

    CONSTRAINT "record_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_status" (
    "id" INTEGER NOT NULL,
    "name" "SaleStatusType" NOT NULL,

    CONSTRAINT "sales_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventory_status" (
    "id" INTEGER NOT NULL,
    "name" "InventoryStatusType" NOT NULL,

    CONSTRAINT "inventory_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "parentId" INTEGER,
    "isProductCategory" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "recordStatusId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attribute_definitions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "dataType" "AttributeDataType" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "toProduct" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "attribute_definitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_attributes" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "attributeDefinitionId" INTEGER NOT NULL,
    "isRequired" BOOLEAN NOT NULL,
    "isFilter" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER,

    CONSTRAINT "category_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_extra_attributes" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "attributes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_extra_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_attribute_values" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "attributeDefinitionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "product_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_attribute_values" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "attributeDefinitionId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "variant_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "productId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("productId","categoryId")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER,
    "productId" INTEGER,
    "fileId" INTEGER NOT NULL,
    "description" TEXT,
    "isPrimary" BOOLEAN NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "displayOrder" INTEGER NOT NULL,
    "featuredOrder" INTEGER,

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_movies" (
    "id" SERIAL NOT NULL,
    "fileId" INTEGER NOT NULL,
    "variantId" INTEGER,
    "productId" INTEGER,
    "description" TEXT,
    "isPrimary" BOOLEAN NOT NULL,
    "displayOrder" INTEGER NOT NULL,

    CONSTRAINT "product_movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "bucket" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "uploadedBy" INTEGER,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review_images" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "fileId" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "review_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "reference" TEXT,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippings" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "methodId" INTEGER NOT NULL,
    "carrierId" INTEGER NOT NULL,
    "shippingCost" DECIMAL(8,2) NOT NULL DEFAULT 0.00,
    "shippedDate" TIMESTAMP(3) NOT NULL,
    "estimatedDelivery" TIMESTAMP(3) NOT NULL,
    "trackingMumber" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "customerNotes" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,
    "shippingStatus" "ShippingStatus" NOT NULL,
    "shippingEvent" "ShippingEvent" NOT NULL,

    CONSTRAINT "shippings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_history" (
    "id" SERIAL NOT NULL,
    "shippingId" INTEGER NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "changedBy" TEXT,
    "shippingStatus" "ShippingStatus" NOT NULL,
    "shippingEvent" "ShippingEvent" NOT NULL,

    CONSTRAINT "shipping_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_methods" (
    "id" SERIAL NOT NULL,
    "type" "ShippingMethodType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "baseCost" DECIMAL(65,30),
    "estimatedDays" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isFree" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "shipping_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipping_carriers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,

    CONSTRAINT "shipping_carriers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_shipping_times" (
    "id" SERIAL NOT NULL,
    "methodId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "minDays" INTEGER,
    "maxDays" INTEGER,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isSameDay" BOOLEAN NOT NULL DEFAULT false,
    "cutoffTime" TIMESTAMP(3),
    "scheduledStartDate" TIMESTAMP(3),
    "scheduledEndDate" TIMESTAMP(3),
    "shippingTimeStatus" "ShippingTimeStatus" NOT NULL,

    CONSTRAINT "product_shipping_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shopping_carts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopping_carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" SERIAL NOT NULL,
    "cartId" INTEGER NOT NULL,
    "variantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_wishlists" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_wishlists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wishlist_items" (
    "id" SERIAL NOT NULL,
    "wishlistId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "orderNumber" TEXT NOT NULL,
    "paymentMethodId" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "totalDiscount" DECIMAL(10,2) DEFAULT 0.00,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "billingAddressId" INTEGER,
    "shippingAddressId" INTEGER NOT NULL,
    "specialInstructions" TEXT,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "trackingCode" TEXT,
    "currencyId" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,
    "orderStatusId" INTEGER NOT NULL,
    "returnStatusId" INTEGER NOT NULL,
    "refundStatusId" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status" (
    "id" INTEGER NOT NULL,
    "name" "OrderStatusType" NOT NULL,

    CONSTRAINT "order_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "return_status" (
    "id" INTEGER NOT NULL,
    "name" "ReturnStatusType" NOT NULL,

    CONSTRAINT "return_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refund_status" (
    "id" INTEGER NOT NULL,
    "name" "RefundStatusType" NOT NULL,

    CONSTRAINT "refund_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "variantId" INTEGER NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "statusId" INTEGER NOT NULL,
    "customerStatus" "InvoiceCustomerStatus",
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "subtotal" DECIMAL(12,2) NOT NULL,
    "paymentMethodId" INTEGER,
    "currencyId" INTEGER NOT NULL DEFAULT 1,
    "totalDiscount" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shippingAddressId" INTEGER,
    "taxAmount" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_items" (
    "id" SERIAL NOT NULL,
    "invoiceId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "variantId" INTEGER NOT NULL,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "taxAmount" DECIMAL(10,2),

    CONSTRAINT "invoice_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_status" (
    "id" INTEGER NOT NULL,
    "name" "InvoiceStatusType" NOT NULL,

    CONSTRAINT "invoice_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" SERIAL NOT NULL,
    "currencyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiryDate" DATE,
    "billingAddressId" INTEGER,
    "cardNumber" TEXT,
    "cardType" TEXT,
    "cardHolder" TEXT,
    "methodType" "PaymentMethodType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "publicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoUrl" TEXT,
    "capabilities" "SupplierCapability"[],
    "relationMode" "SupplierRelationMode" NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "recordStatusId" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_users" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "operationalStatus" "SupplierOperationalStatus" NOT NULL,
    "recordStatusId" INTEGER NOT NULL,

    CONSTRAINT "supplier_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_contacts" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "role" "SupplierContactRole" NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "supplier_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier_products" (
    "id" SERIAL NOT NULL,
    "variantId" INTEGER,
    "productId" INTEGER NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "purchasePrice" DECIMAL(65,30),
    "supplierStock" INTEGER,
    "shippingCost" DECIMAL(65,30),
    "promotionStart" TIMESTAMP(3),
    "usesOwnShipping" BOOLEAN NOT NULL DEFAULT false,
    "promotionEnd" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "supplier_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_reviews" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "product_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_statuses" (
    "id" INTEGER NOT NULL,
    "name" "VerificationStatusType" NOT NULL,
    "description" TEXT,

    CONSTRAINT "verification_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status_change_history" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "previousStatus" "VerificationStatusType",
    "newStatus" "VerificationStatusType" NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authUserId" INTEGER NOT NULL,

    CONSTRAINT "status_change_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_notifications" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_statistics" (
    "productId" INTEGER NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "sales" INTEGER NOT NULL DEFAULT 0,
    "lastViewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_statistics_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" SERIAL NOT NULL,
    "eventType" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" INTEGER,
    "entityType" TEXT,
    "entityId" INTEGER,
    "properties" JSONB,
    "url" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_sales_summary" (
    "id" SERIAL NOT NULL,
    "currencyId" INTEGER NOT NULL DEFAULT 1,
    "date" TIMESTAMP(3) NOT NULL,
    "totalOrders" INTEGER NOT NULL,
    "averageOrderValue" DECIMAL(10,2) NOT NULL,
    "uniqueCustomers" INTEGER NOT NULL,
    "totalProductsSold" INTEGER NOT NULL,
    "totalDiscounts" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalTaxes" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalShipping" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "conversionRate" DECIMAL(5,4) NOT NULL,
    "averageItemsPerOrder" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_sales_summary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "code" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "PromotionStatusType" NOT NULL,
    "discountType" "DiscountType" NOT NULL,
    "discountValue" DOUBLE PRECISION NOT NULL,
    "maxUses" INTEGER,
    "usedCount" INTEGER DEFAULT 0,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "supplierId" INTEGER,
    "productId" INTEGER,
    "categoryId" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_uses" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "userId" INTEGER,
    "orderId" INTEGER,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "discountApplied" DOUBLE PRECISION,
    "clientIp" TEXT,
    "status" TEXT,
    "notes" TEXT,

    CONSTRAINT "promotion_uses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_rules" (
    "id" SERIAL NOT NULL,
    "promotionId" INTEGER NOT NULL,
    "conditionType" VARCHAR(50) NOT NULL,
    "operator" VARCHAR(10),
    "value" VARCHAR(255),
    "description" VARCHAR(255),
    "priority" INTEGER DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "promotion_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_ads" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdById" INTEGER NOT NULL,
    "updatedBy" TEXT,
    "updatedById" INTEGER,

    CONSTRAINT "featured_ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_Ad_items" (
    "adId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "featured_Ad_items_pkey" PRIMARY KEY ("adId","productId")
);

-- CreateTable
CREATE TABLE "product_search_index" (
    "productId" INTEGER NOT NULL,
    "searchData" TEXT NOT NULL,
    "searchVector" tsvector
);

-- CreateTable
CREATE TABLE "background_jobs" (
    "id" SERIAL NOT NULL,
    "queue" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 3,
    "status" "JobStatusType" NOT NULL,
    "errorMessage" TEXT,
    "runAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "background_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_limits" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL,
    "maxAttempts" INTEGER NOT NULL,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "blockedUntil" TIMESTAMP(3),

    CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "data_versions" (
    "id" SERIAL NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "changeType" TEXT NOT NULL,
    "changedBy" INTEGER,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,

    CONSTRAINT "data_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "system_config_key_key" ON "system_config"("key");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_section_key_key" ON "system_config"("section", "key");

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_name_key" ON "feature_flags"("name");

-- CreateIndex
CREATE INDEX "audit_logs_entity_entityId_idx" ON "audit_logs"("entity", "entityId");

-- CreateIndex
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");

-- CreateIndex
CREATE INDEX "audit_logs_level_idx" ON "audit_logs"("level");

-- CreateIndex
CREATE UNIQUE INDEX "system_cache_key_key" ON "system_cache"("key");

-- CreateIndex
CREATE INDEX "system_cache_expiresA_idx" ON "system_cache"("expiresA");

-- CreateIndex
CREATE INDEX "system_cache_entityType_entityId_idx" ON "system_cache"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "companies_commercialName_idx" ON "companies"("commercialName");

-- CreateIndex
CREATE INDEX "companies_legalName_idx" ON "companies"("legalName");

-- CreateIndex
CREATE INDEX "companies_taxId_idx" ON "companies"("taxId");

-- CreateIndex
CREATE UNIQUE INDEX "users_publicId_key" ON "users"("publicId");

-- CreateIndex
CREATE INDEX "users_lastName_firstName_idx" ON "users"("lastName", "firstName");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_phone_idx" ON "users"("phone");

-- CreateIndex
CREATE INDEX "users_isDeleted_idx" ON "users"("isDeleted");

-- CreateIndex
CREATE INDEX "users_lastOrderDate_idx" ON "users"("lastOrderDate");

-- CreateIndex
CREATE INDEX "user_authentications_email_idx" ON "user_authentications"("email");

-- CreateIndex
CREATE INDEX "user_authentications_phone_idx" ON "user_authentications"("phone");

-- CreateIndex
CREATE INDEX "user_authentications_verificationStatusId_idx" ON "user_authentications"("verificationStatusId");

-- CreateIndex
CREATE INDEX "user_authentications_isDeleted_idx" ON "user_authentications"("isDeleted");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentications_email_authMethod_key" ON "user_authentications"("email", "authMethod");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentications_userId_key" ON "user_authentications"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_authentications_supplierUserId_key" ON "user_authentications"("supplierUserId");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_sessionToken_key" ON "user_sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "user_sessions_authId_idx" ON "user_sessions"("authId");

-- CreateIndex
CREATE INDEX "user_preferences_userId_idx" ON "user_preferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_resource_action_key" ON "permissions"("resource", "action");

-- CreateIndex
CREATE INDEX "user_addresses_userId_idx" ON "user_addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "currencies_code_key" ON "currencies"("code");

-- CreateIndex
CREATE UNIQUE INDEX "products_publicId_key" ON "products"("publicId");

-- CreateIndex
CREATE UNIQUE INDEX "products_parentSku_key" ON "products"("parentSku");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_supplierId_recordStatusId_idx" ON "products"("supplierId", "recordStatusId");

-- CreateIndex
CREATE INDEX "products_saleStatusId_idx" ON "products"("saleStatusId");

-- CreateIndex
CREATE INDEX "products_inventoryStatusId_idx" ON "products"("inventoryStatusId");

-- CreateIndex
CREATE INDEX "products_mainCategoryId_idx" ON "products"("mainCategoryId");

-- CreateIndex
CREATE INDEX "products_deletedAt_idx" ON "products"("deletedAt");

-- CreateIndex
CREATE INDEX "products_lastCategoryId_idx" ON "products"("lastCategoryId");

-- CreateIndex
CREATE INDEX "products_recordStatusId_idx" ON "products"("recordStatusId");

-- CreateIndex
CREATE INDEX "products_supplierId_idx" ON "products"("supplierId");

-- CreateIndex
CREATE INDEX "products_verificationStatusId_idx" ON "products"("verificationStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_sku_key" ON "product_variants"("sku");

-- CreateIndex
CREATE INDEX "product_variants_productId_deletedAt_idx" ON "product_variants"("productId", "deletedAt");

-- CreateIndex
CREATE INDEX "product_variants_productId_price_idx" ON "product_variants"("productId", "price");

-- CreateIndex
CREATE INDEX "product_variants_productId_stockQuantity_idx" ON "product_variants"("productId", "stockQuantity");

-- CreateIndex
CREATE INDEX "product_variants_productId_idx" ON "product_variants"("productId");

-- CreateIndex
CREATE INDEX "product_variants_productId_recordStatusId_idx" ON "product_variants"("productId", "recordStatusId");

-- CreateIndex
CREATE INDEX "product_variants_recordStatusId_idx" ON "product_variants"("recordStatusId");

-- CreateIndex
CREATE INDEX "product_variants_saleStatusId_idx" ON "product_variants"("saleStatusId");

-- CreateIndex
CREATE INDEX "product_variants_inventoryStatusId_idx" ON "product_variants"("inventoryStatusId");

-- CreateIndex
CREATE INDEX "product_variants_productId_isMainVariant_idx" ON "product_variants"("productId", "isMainVariant");

-- CreateIndex
CREATE INDEX "categories_slug_idx" ON "categories"("slug");

-- CreateIndex
CREATE INDEX "categories_recordStatusId_idx" ON "categories"("recordStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "category_attributes_categoryId_attributeDefinitionId_key" ON "category_attributes"("categoryId", "attributeDefinitionId");

-- CreateIndex
CREATE INDEX "product_attribute_values_attributeDefinitionId_idx" ON "product_attribute_values"("attributeDefinitionId");

-- CreateIndex
CREATE INDEX "product_attribute_values_productId_idx" ON "product_attribute_values"("productId");

-- CreateIndex
CREATE INDEX "product_attribute_values_value_idx" ON "product_attribute_values"("value");

-- CreateIndex
CREATE INDEX "variant_attribute_values_variantId_idx" ON "variant_attribute_values"("variantId");

-- CreateIndex
CREATE INDEX "variant_attribute_values_attributeDefinitionId_idx" ON "variant_attribute_values"("attributeDefinitionId");

-- CreateIndex
CREATE INDEX "variant_attribute_values_value_idx" ON "variant_attribute_values"("value");

-- CreateIndex
CREATE INDEX "product_categories_categoryId_idx" ON "product_categories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_fileId_key" ON "product_images"("fileId");

-- CreateIndex
CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");

-- CreateIndex
CREATE INDEX "product_images_variantId_idx" ON "product_images"("variantId");

-- CreateIndex
CREATE INDEX "product_images_productId_fileId_idx" ON "product_images"("productId", "fileId");

-- CreateIndex
CREATE INDEX "product_images_variantId_fileId_idx" ON "product_images"("variantId", "fileId");

-- CreateIndex
CREATE UNIQUE INDEX "product_movies_fileId_key" ON "product_movies"("fileId");

-- CreateIndex
CREATE INDEX "product_movies_productId_idx" ON "product_movies"("productId");

-- CreateIndex
CREATE INDEX "product_movies_variantId_idx" ON "product_movies"("variantId");

-- CreateIndex
CREATE INDEX "review_images_reviewId_idx" ON "review_images"("reviewId");

-- CreateIndex
CREATE INDEX "shippings_shippingStatus_idx" ON "shippings"("shippingStatus");

-- CreateIndex
CREATE INDEX "shippings_orderId_idx" ON "shippings"("orderId");

-- CreateIndex
CREATE INDEX "shippings_carrierId_idx" ON "shippings"("carrierId");

-- CreateIndex
CREATE INDEX "shippings_methodId_idx" ON "shippings"("methodId");

-- CreateIndex
CREATE INDEX "shipping_history_shippingStatus_idx" ON "shipping_history"("shippingStatus");

-- CreateIndex
CREATE INDEX "shipping_history_shippingId_idx" ON "shipping_history"("shippingId");

-- CreateIndex
CREATE INDEX "product_shipping_times_shippingTimeStatus_idx" ON "product_shipping_times"("shippingTimeStatus");

-- CreateIndex
CREATE INDEX "product_shipping_times_productId_idx" ON "product_shipping_times"("productId");

-- CreateIndex
CREATE INDEX "product_shipping_times_supplierId_idx" ON "product_shipping_times"("supplierId");

-- CreateIndex
CREATE INDEX "shopping_carts_userId_idx" ON "shopping_carts"("userId");

-- CreateIndex
CREATE INDEX "cart_items_cartId_idx" ON "cart_items"("cartId");

-- CreateIndex
CREATE INDEX "cart_items_variantId_idx" ON "cart_items"("variantId");

-- CreateIndex
CREATE INDEX "user_wishlists_userId_idx" ON "user_wishlists"("userId");

-- CreateIndex
CREATE INDEX "wishlist_items_wishlistId_idx" ON "wishlist_items"("wishlistId");

-- CreateIndex
CREATE INDEX "wishlist_items_productId_idx" ON "wishlist_items"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_orderNumber_key" ON "orders"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "orders_publicId_key" ON "orders"("publicId");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");

-- CreateIndex
CREATE INDEX "orders_orderStatusId_idx" ON "orders"("orderStatusId");

-- CreateIndex
CREATE INDEX "orders_refundStatusId_idx" ON "orders"("refundStatusId");

-- CreateIndex
CREATE INDEX "orders_orderStatusId_refundStatusId_idx" ON "orders"("orderStatusId", "refundStatusId");

-- CreateIndex
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

-- CreateIndex
CREATE INDEX "orders_orderNumber_idx" ON "orders"("orderNumber");

-- CreateIndex
CREATE INDEX "orders_trackingCode_idx" ON "orders"("trackingCode");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_variantId_idx" ON "order_items"("variantId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_invoiceNumber_key" ON "invoices"("invoiceNumber");

-- CreateIndex
CREATE INDEX "invoices_shippingAddressId_idx" ON "invoices"("shippingAddressId");

-- CreateIndex
CREATE INDEX "invoices_orderId_idx" ON "invoices"("orderId");

-- CreateIndex
CREATE INDEX "invoices_paymentMethodId_idx" ON "invoices"("paymentMethodId");

-- CreateIndex
CREATE INDEX "invoices_issueDate_idx" ON "invoices"("issueDate");

-- CreateIndex
CREATE INDEX "invoice_items_invoiceId_idx" ON "invoice_items"("invoiceId");

-- CreateIndex
CREATE INDEX "invoice_items_variantId_idx" ON "invoice_items"("variantId");

-- CreateIndex
CREATE INDEX "payment_methods_billingAddressId_idx" ON "payment_methods"("billingAddressId");

-- CreateIndex
CREATE INDEX "payment_methods_userId_idx" ON "payment_methods"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "suppliers_publicId_key" ON "suppliers"("publicId");

-- CreateIndex
CREATE INDEX "suppliers_name_idx" ON "suppliers"("name");

-- CreateIndex
CREATE INDEX "suppliers_recordStatusId_idx" ON "suppliers"("recordStatusId");

-- CreateIndex
CREATE INDEX "supplier_users_supplierId_idx" ON "supplier_users"("supplierId");

-- CreateIndex
CREATE INDEX "supplier_users_recordStatusId_idx" ON "supplier_users"("recordStatusId");

-- CreateIndex
CREATE INDEX "supplier_contacts_supplierId_idx" ON "supplier_contacts"("supplierId");

-- CreateIndex
CREATE UNIQUE INDEX "supplier_contacts_supplierId_isPrimary_key" ON "supplier_contacts"("supplierId", "isPrimary");

-- CreateIndex
CREATE INDEX "supplier_products_variantId_idx" ON "supplier_products"("variantId");

-- CreateIndex
CREATE INDEX "supplier_products_supplierId_idx" ON "supplier_products"("supplierId");

-- CreateIndex
CREATE INDEX "supplier_products_productId_idx" ON "supplier_products"("productId");

-- CreateIndex
CREATE INDEX "product_reviews_userId_idx" ON "product_reviews"("userId");

-- CreateIndex
CREATE INDEX "product_reviews_productId_idx" ON "product_reviews"("productId");

-- CreateIndex
CREATE INDEX "analytics_events_eventType_createdAt_idx" ON "analytics_events"("eventType", "createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_userId_createdAt_idx" ON "analytics_events"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "analytics_events_sessionId_idx" ON "analytics_events"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "daily_sales_summary_date_key" ON "daily_sales_summary"("date");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "promotions_code_idx" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "promotions_supplierId_idx" ON "promotions"("supplierId");

-- CreateIndex
CREATE INDEX "promotions_productId_idx" ON "promotions"("productId");

-- CreateIndex
CREATE INDEX "promotions_categoryId_idx" ON "promotions"("categoryId");

-- CreateIndex
CREATE INDEX "promotion_uses_promotionId_idx" ON "promotion_uses"("promotionId");

-- CreateIndex
CREATE INDEX "promotion_uses_userId_idx" ON "promotion_uses"("userId");

-- CreateIndex
CREATE INDEX "promotion_uses_orderId_idx" ON "promotion_uses"("orderId");

-- CreateIndex
CREATE INDEX "promotion_rules_promotionId_idx" ON "promotion_rules"("promotionId");

-- CreateIndex
CREATE INDEX "promotion_rules_conditionType_idx" ON "promotion_rules"("conditionType");

-- CreateIndex
CREATE INDEX "featured_Ad_items_productId_idx" ON "featured_Ad_items"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "product_search_index_productId_key" ON "product_search_index"("productId");

-- CreateIndex
CREATE INDEX "product_search_index_searchVector_idx" ON "product_search_index" USING GIN ("searchVector");

-- CreateIndex
CREATE INDEX "background_jobs_queue_status_runAt_idx" ON "background_jobs"("queue", "status", "runAt");

-- CreateIndex
CREATE INDEX "background_jobs_createdAt_idx" ON "background_jobs"("createdAt");

-- CreateIndex
CREATE INDEX "rate_limits_identifier_action_idx" ON "rate_limits"("identifier", "action");

-- CreateIndex
CREATE INDEX "rate_limits_windowEnd_idx" ON "rate_limits"("windowEnd");

-- CreateIndex
CREATE INDEX "data_versions_entityType_entityId_idx" ON "data_versions"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "data_versions_changedAt_idx" ON "data_versions"("changedAt");

-- CreateIndex
CREATE UNIQUE INDEX "data_versions_entityType_entityId_versionNumber_key" ON "data_versions"("entityType", "entityId", "versionNumber");

-- AddForeignKey
ALTER TABLE "system_config" ADD CONSTRAINT "system_config_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "system_config" ADD CONSTRAINT "system_config_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_supplierUserId_fkey" FOREIGN KEY ("supplierUserId") REFERENCES "supplier_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_authentications" ADD CONSTRAINT "user_authentications_verificationStatusId_fkey" FOREIGN KEY ("verificationStatusId") REFERENCES "verification_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_authId_fkey" FOREIGN KEY ("authId") REFERENCES "user_authentications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_authId_fkey" FOREIGN KEY ("authId") REFERENCES "user_authentications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "currencies" ADD CONSTRAINT "currencies_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_saleStatusId_fkey" FOREIGN KEY ("saleStatusId") REFERENCES "sales_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_inventoryStatusId_fkey" FOREIGN KEY ("inventoryStatusId") REFERENCES "inventory_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_lastCategoryId_fkey" FOREIGN KEY ("lastCategoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_verificationStatusId_fkey" FOREIGN KEY ("verificationStatusId") REFERENCES "verification_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_saleStatusId_fkey" FOREIGN KEY ("saleStatusId") REFERENCES "sales_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_inventoryStatusId_fkey" FOREIGN KEY ("inventoryStatusId") REFERENCES "inventory_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_definitions" ADD CONSTRAINT "attribute_definitions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attribute_definitions" ADD CONSTRAINT "attribute_definitions_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_attributes" ADD CONSTRAINT "category_attributes_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_extra_attributes" ADD CONSTRAINT "product_extra_attributes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_attribute_values" ADD CONSTRAINT "variant_attribute_values_attributeDefinitionId_fkey" FOREIGN KEY ("attributeDefinitionId") REFERENCES "attribute_definitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_movies" ADD CONSTRAINT "product_movies_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_movies" ADD CONSTRAINT "product_movies_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_movies" ADD CONSTRAINT "product_movies_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "media_files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_files" ADD CONSTRAINT "media_files_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "product_reviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_images" ADD CONSTRAINT "review_images_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "media_files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "shipping_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_carrierId_fkey" FOREIGN KEY ("carrierId") REFERENCES "shipping_carriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_history" ADD CONSTRAINT "shipping_history_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_shipping_times" ADD CONSTRAINT "product_shipping_times_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_shipping_times" ADD CONSTRAINT "product_shipping_times_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_shipping_times" ADD CONSTRAINT "product_shipping_times_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "shipping_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "shopping_carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_wishlists" ADD CONSTRAINT "user_wishlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "user_wishlists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_returnStatusId_fkey" FOREIGN KEY ("returnStatusId") REFERENCES "return_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_refundStatusId_fkey" FOREIGN KEY ("refundStatusId") REFERENCES "refund_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "user_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "invoice_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paymentMethodId_fkey" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_methods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_billingAddressId_fkey" FOREIGN KEY ("billingAddressId") REFERENCES "user_addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_users" ADD CONSTRAINT "supplier_users_recordStatusId_fkey" FOREIGN KEY ("recordStatusId") REFERENCES "record_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_users" ADD CONSTRAINT "supplier_users_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_contacts" ADD CONSTRAINT "supplier_contacts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supplier_products" ADD CONSTRAINT "supplier_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "status_change_history" ADD CONSTRAINT "status_change_history_authUserId_fkey" FOREIGN KEY ("authUserId") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_statistics" ADD CONSTRAINT "product_statistics_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_sales_summary" ADD CONSTRAINT "daily_sales_summary_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "currencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_rules" ADD CONSTRAINT "promotion_rules_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_ads" ADD CONSTRAINT "featured_ads_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "user_authentications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_ads" ADD CONSTRAINT "featured_ads_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "user_authentications"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_Ad_items" ADD CONSTRAINT "featured_Ad_items_adId_fkey" FOREIGN KEY ("adId") REFERENCES "featured_ads"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_Ad_items" ADD CONSTRAINT "featured_Ad_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_search_index" ADD CONSTRAINT "product_search_index_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
