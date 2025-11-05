# ---------- Base build image ----------
FROM node:20-alpine AS base

WORKDIR /app

# Install OS deps
RUN apk add --no-cache libc6-compat

# Copy package files and optional config files
COPY package*.json ./

# Copy .npmrc and .env if they exist (use COPY with wildcard or make them optional)
COPY .npmrc* ./
COPY .env* ./

# Install dependencies
RUN npm ci

# Copy the full application
COPY . .


# Build Next.js app
RUN npm run build


# ---------- Production runtime ----------
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy only what runtime needs
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/assets ./assets
COPY --from=base /app/package*.json ./

# Copy environment files if they exist
COPY --from=base /app/.env* ./

# Cleanup unnecessary build secrets/configs
RUN rm -f .npmrc || true

# Next.js runs on 80 but you mapped external already
EXPOSE 80

CMD ["npm", "start"]
