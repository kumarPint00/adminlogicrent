#!/bin/bash

# Function to create directories and files
create_file_structure() {
  mkdir -p pages/dashboard
  mkdir -p pages/tenants
  mkdir -p pages/tenants/[tenantId]
  mkdir -p pages/cars
  mkdir -p pages/cars/[carId]
  mkdir -p pages/bookings
  mkdir -p pages/transactions
  mkdir -p pages/settings
  mkdir -p pages/analytics
  mkdir -p components
  mkdir -p context
  mkdir -p services
  mkdir -p utils
  mkdir -p styles
  mkdir -p types

  # Pages
  echo "// Shared Dashboard" > pages/dashboard/index.tsx
  echo "// SuperAdmin Dashboard" > pages/dashboard/superadmin.tsx

  echo "// Tenant List and Management" > pages/tenants/index.tsx
  echo "// Add a New Tenant" > pages/tenants/add.tsx
  echo "// Tenant Overview" > pages/tenants/[tenantId]/index.tsx
  echo "// Tenant's Car Management" > pages/tenants/[tenantId]/cars.tsx
  echo "// Tenant's Bookings Management" > pages/tenants/[tenantId]/bookings.tsx
  echo "// Tenant's Transactions" > pages/tenants/[tenantId]/transactions.tsx
  echo "// Tenant's Settings" > pages/tenants/[tenantId]/settings.tsx

  echo "// All Cars Management" > pages/cars/index.tsx
  echo "// Edit Car Details" > pages/cars/[carId]/edit.tsx

  echo "// All Bookings Management" > pages/bookings/index.tsx
  echo "// All Transactions Management" > pages/transactions/index.tsx

  echo "// Global Settings (SuperAdmin Only)" > pages/settings/index.tsx
  echo "// Reports and Analytics" > pages/analytics/index.tsx

  # Components
  echo "// Sidebar Component" > components/Sidebar.tsx
  echo "// Navbar Component" > components/Navbar.tsx
  echo "// Reusable Table Component" > components/Table.tsx
  echo "// Reusable Card Component" > components/Card.tsx
  echo "// Role Badge Component" > components/RoleBadge.tsx

  # Context
  echo "// Authentication Context" > context/AuthContext.tsx
  echo "// Tenant Context" > context/TenantContext.tsx

  # Services
  echo "// API Client" > services/api.ts
  echo "// Tenant-related API calls" > services/tenants.ts
  echo "// Car-related API calls" > services/cars.ts
  echo "// Booking-related API calls" > services/bookings.ts
  echo "// Authentication-related API calls" > services/auth.ts

  # Utils
  echo "// Helper Functions" > utils/helpers.ts
  echo "// Role-based Permission Handling" > utils/permissions.ts
  echo "// Constants" > utils/constants.ts

  # Styles
  echo "/* Global Styles */" > styles/globals.css

  # Types
  echo "// Type Definitions for Tenants" > types/Tenant.ts
  echo "// Type Definitions for Cars" > types/Car.ts
  echo "// Type Definitions for Bookings" > types/Booking.ts

  # Middleware
  echo "// Middleware for Route Protection" > middleware.ts
}

# Run the function
create_file_structure

echo "File structure generated successfully!"
