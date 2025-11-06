# ---------- Base builder ----------
FROM node:20-alpine AS builder

WORKDIR /app
RUN apk add --no-cache libc6-compat

COPY package*.json .npmrc ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Production runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install only prod dependencies
COPY package*.json .npmrc ./
RUN npm ci 

# Copy build output & dependencies
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Expose 80
EXPOSE 80

# Force Next.js to run on port 80
ENV PORT=80

CMD ["node_modules/.bin/next", "start", "-p", "80"]
