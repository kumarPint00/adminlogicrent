# -----------------------------
# 1. Builder Stage
# -----------------------------
FROM node:18-bullseye AS builder

# Set working directory
WORKDIR /app

# Install system dependencies required by native modules (e.g., sharp)
RUN apt-get update && apt-get install -y libvips && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Prune devDependencies to reduce image size
RUN npm prune --production

# -----------------------------
# 2. Runner Stage
# -----------------------------
FROM node:18-bullseye AS runner

# Set NODE_ENV to production for optimizations
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Set working directory
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y libvips && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm install --legacy-peer-deps --only=production

# Copy built assets and necessary directories from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port defined in the start script (3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
