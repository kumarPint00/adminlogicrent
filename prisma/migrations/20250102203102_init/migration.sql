/*
  Warnings:

  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `brand` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `carProviderId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SuperAdmin', 'Admin', 'CarProvider', 'Customer', 'TenantAdmin');

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "branchId" TEXT,
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "carFeaturesId" TEXT,
ADD COLUMN     "carImagesId" TEXT,
ADD COLUMN     "carProviderId" TEXT NOT NULL,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "colour" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "exteriorColor" TEXT,
ADD COLUMN     "fIprice" TEXT,
ADD COLUMN     "featuredCar" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fuelType" TEXT,
ADD COLUMN     "interiorColor" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "ongoingOfferBannerId" TEXT,
ADD COLUMN     "packageDetailsId" TEXT,
ADD COLUMN     "sIprice" TEXT,
ADD COLUMN     "services" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'inactive',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vehicleType" TEXT,
ADD COLUMN     "version" TEXT,
ADD COLUMN     "year" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "bookingId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "contactInformation" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fullName" TEXT,
ADD COLUMN     "refreshToken" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "username" TEXT,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole";

-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "permissions" TEXT[],
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarProvider" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "address" TEXT,
    "website" TEXT,
    "contactPerson" TEXT,
    "licenseNumber" TEXT,
    "insuranceInformation" TEXT,
    "rating" DOUBLE PRECISION,
    "registrationDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3),
    "membershipLevel" TEXT,
    "paymentInformation" TEXT,
    "socialMediaLinks" TEXT[],
    "additionalServices" TEXT,
    "subscriptionIsActive" BOOLEAN NOT NULL DEFAULT false,
    "subscriptionStartDate" TIMESTAMP(3),
    "subscriptionEndDate" TIMESTAMP(3),
    "subscriptionPlan" TEXT,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "carProviderId" TEXT NOT NULL,
    "location" TEXT,
    "operationTime" TEXT,
    "branchEmail" TEXT,
    "branchWhatsapp" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PackageDetail" (
    "id" TEXT NOT NULL,
    "securityDeposit" TEXT,
    "excessClaimAmount" TEXT,
    "creditCard" TEXT,
    "dprice" TEXT,
    "dnumOFFreeKMs" TEXT,
    "dpriceAfterFreeKMs" TEXT,
    "dfreeCancellation" BOOLEAN DEFAULT false,
    "dcancellationCharge" TEXT,
    "ddeliveryCharges" TEXT,
    "dminimumDays" TEXT,
    "wprice" TEXT,
    "wnumOFFreeKMs" TEXT,
    "wpriceAfterFreeKMs" TEXT,
    "wfreeCancellation" BOOLEAN DEFAULT false,
    "wcancellationCharge" TEXT,
    "wdeliveryCharges" TEXT,
    "m1price" TEXT,
    "m1numOFFreeKMs" TEXT,
    "m1priceAfterFreeKMs" TEXT,
    "m1freeCancellation" BOOLEAN DEFAULT false,
    "m1cancellationCharge" TEXT,
    "m1deliveryCharges" TEXT,
    "m3price" TEXT,
    "m3numOFFreeKMs" TEXT,
    "m3priceAfterFreeKMs" TEXT,
    "m3freeCancellation" BOOLEAN DEFAULT false,
    "m3cancellationCharge" TEXT,
    "m3deliveryCharges" TEXT,
    "m6price" TEXT,
    "m6numOFFreeKMs" TEXT,
    "m6priceAfterFreeKMs" TEXT,
    "m6freeCancellation" BOOLEAN DEFAULT false,
    "m6cancellationCharge" TEXT,
    "m6deliveryCharges" TEXT,
    "m9price" TEXT,
    "m9numOFFreeKMs" TEXT,
    "m9priceAfterFreeKMs" TEXT,
    "m9freeCancellation" BOOLEAN DEFAULT false,
    "m9cancellationCharge" TEXT,
    "m9deliveryCharges" TEXT,
    "extraMileageCost" TEXT,
    "cdwInsurancePerDay" TEXT,
    "cdwInsurancePerMonth" TEXT,
    "cdwInsurancePerYear" TEXT,
    "cdwInsurance" TEXT,
    "deliveryAndPickUpCharges" TEXT,
    "specialNoteForCustomers" TEXT,
    "paymentMethods" TEXT,
    "onGoingOffer" BOOLEAN NOT NULL DEFAULT false,
    "regularPriceWeekly" TEXT,
    "regularPriceMonthly" TEXT,
    "offerPriceWeekly" TEXT,
    "offerPriceMonthly" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PackageDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarFeature" (
    "id" TEXT NOT NULL,
    "transmission" TEXT,
    "cruiseControl" BOOLEAN NOT NULL DEFAULT false,
    "engineCapacity" TEXT,
    "luggageBootCapacity" TEXT,
    "engineSize" TEXT,
    "bluetooth" BOOLEAN NOT NULL DEFAULT false,
    "aux" BOOLEAN NOT NULL DEFAULT false,
    "seater" TEXT,
    "userId" TEXT,
    "navigation" BOOLEAN NOT NULL DEFAULT false,
    "parkingSense" BOOLEAN NOT NULL DEFAULT false,
    "appleCarPlay" BOOLEAN NOT NULL DEFAULT false,
    "isoFix" BOOLEAN NOT NULL DEFAULT false,
    "sunRoof" BOOLEAN NOT NULL DEFAULT false,
    "pushButton" BOOLEAN NOT NULL DEFAULT false,
    "lcd" BOOLEAN NOT NULL DEFAULT false,
    "rearCamera" BOOLEAN NOT NULL DEFAULT false,
    "gccSpecs" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CarImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OngoingOfferBanner" (
    "id" TEXT NOT NULL,
    "offerTitle" TEXT NOT NULL,
    "offerDescription" TEXT,
    "bannerImage" TEXT,
    "offerExpiryDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OngoingOfferBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OngoingOffer" (
    "id" TEXT NOT NULL,
    "offerTitle" TEXT NOT NULL,
    "offerDescription" TEXT,
    "bannerImage" TEXT,
    "offerExpiryDate" TIMESTAMP(3),
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OngoingOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingDetails" (
    "id" TEXT NOT NULL,
    "carId" TEXT,
    "pickupDate" TIMESTAMP(3),
    "returnDate" TIMESTAMP(3),
    "documents" TEXT[],
    "pickupLocation" TEXT,
    "superAdminId" TEXT,
    "ongoingOfferId" TEXT,
    "returnLocation" TEXT,
    "additionalServices" TEXT,
    "insuranceInformation" TEXT,
    "damageReport" TEXT,
    "enquiryId" TEXT,
    "adminId" TEXT,
    "carProviderId" TEXT,
    "bookingDates" TIMESTAMP(3)[],
    "subscriptionLogId" TEXT,
    "promotionId" TEXT,
    "promoCodeId" TEXT,
    "documentId" TEXT,
    "invoiceId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "paymentDetails" JSONB,
    "transactionId" TEXT,
    "subscriptionId" TEXT,
    "reviewId" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingHistory" (
    "id" TEXT NOT NULL,
    "bookingDetailsId" TEXT,
    "bookingStatus" TEXT,
    "paymentInformation" TEXT,
    "totalPrice" DOUBLE PRECISION,
    "bookingDuration" INTEGER,
    "feedback" TEXT,
    "rating" INTEGER,
    "specialRequests" TEXT,
    "cancellationReason" TEXT,
    "promoCode" TEXT,
    "bookingReferenceNumber" TEXT,
    "userContactInformation" TEXT,
    "packageDetailId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT,
    "userId" TEXT,
    "paymentDetails" JSONB,
    "totalAmount" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "duration" INTEGER,
    "price" DOUBLE PRECISION,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionLog" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "userId" TEXT,
    "action" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubscriptionLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "carId" TEXT,
    "rating" DOUBLE PRECISION,
    "reviewText" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "carId" TEXT,
    "generatedById" TEXT,
    "superAdminId" TEXT,
    "adminId" TEXT,
    "carProviderId" TEXT,
    "userId" TEXT,
    "bookingHistoryId" TEXT,
    "reportType" TEXT,
    "parameters" JSONB,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "promoCode" TEXT,
    "discountPercentage" TEXT,
    "expirationDate" TEXT,
    "terms" TEXT,
    "bannerImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPromotion" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "carProviderId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPromotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discountPercentage" DOUBLE PRECISION,
    "maxUsageLimit" INTEGER,
    "currentUsageCount" INTEGER DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "validFrom" TIMESTAMP(3),
    "validTo" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "recipientId" TEXT,
    "message" TEXT,
    "type" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Unread',
    "notificationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "carName" TEXT,
    "startDate" TIMESTAMP(3),
    "preferContact" TEXT,
    "isNewEnquiry" BOOLEAN NOT NULL DEFAULT true,
    "isEnquiryClosed" BOOLEAN NOT NULL DEFAULT false,
    "isEnquiryConverted" BOOLEAN NOT NULL DEFAULT false,
    "isEnquiryDeleted" BOOLEAN NOT NULL DEFAULT false,
    "isEnquiryBooked" BOOLEAN NOT NULL DEFAULT false,
    "isEnquiryFollowUp" BOOLEAN NOT NULL DEFAULT false,
    "endDate" TIMESTAMP(3),
    "pickUpLoc" TEXT,
    "dropLocation" TEXT,
    "phoneNumber" TEXT,
    "area" TEXT,
    "message" TEXT,
    "deliveryMode" TEXT,
    "city" TEXT,
    "email" TEXT,
    "packageType" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "enquiryType" TEXT NOT NULL DEFAULT 'website',
    "subscriptionLength" TEXT,
    "budget" TEXT,
    "additionalServices" TEXT[],
    "totalPayment" TEXT,
    "source" TEXT NOT NULL DEFAULT 'logicrent.ae',
    "promotionalCode" TEXT,
    "insuranceType" TEXT,
    "currentEnquiryStatus" TEXT,
    "enquiryStatus" BOOLEAN NOT NULL DEFAULT true,
    "bookingCreated" TIMESTAMP(3),
    "bookingUpdated" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "type" TEXT,
    "size" INTEGER,
    "url" TEXT,
    "uploadedById" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "userId" TEXT,
    "model" TEXT NOT NULL,
    "recordId" TEXT NOT NULL,
    "changes" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_packageDetailsId_fkey" FOREIGN KEY ("packageDetailsId") REFERENCES "PackageDetail"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carFeaturesId_fkey" FOREIGN KEY ("carFeaturesId") REFERENCES "CarFeature"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carImagesId_fkey" FOREIGN KEY ("carImagesId") REFERENCES "CarImage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ongoingOfferBannerId_fkey" FOREIGN KEY ("ongoingOfferBannerId") REFERENCES "OngoingOfferBanner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carProviderId_fkey" FOREIGN KEY ("carProviderId") REFERENCES "CarProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarFeature" ADD CONSTRAINT "CarFeature_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_carProviderId_fkey" FOREIGN KEY ("carProviderId") REFERENCES "CarProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_ongoingOfferId_fkey" FOREIGN KEY ("ongoingOfferId") REFERENCES "OngoingOffer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_subscriptionLogId_fkey" FOREIGN KEY ("subscriptionLogId") REFERENCES "SubscriptionLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_promoCodeId_fkey" FOREIGN KEY ("promoCodeId") REFERENCES "PromoCode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingDetails" ADD CONSTRAINT "BookingDetails_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_superAdminId_fkey" FOREIGN KEY ("superAdminId") REFERENCES "SuperAdmin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_carProviderId_fkey" FOREIGN KEY ("carProviderId") REFERENCES "CarProvider"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_bookingHistoryId_fkey" FOREIGN KEY ("bookingHistoryId") REFERENCES "BookingHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
