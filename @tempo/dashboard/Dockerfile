ARG ORG
ARG APP
ARG PORT
ARG API_URL

ARG ROOT_DIR=/root

ARG NODE_VERSION=22
ARG PNPM_VERSION=10.2.1

###################################################################
# Stage 0: Base image                                             #
###################################################################

FROM node:${NODE_VERSION}-alpine AS base

ARG APP
ARG ROOT_DIR

LABEL org.opencontainers.image.source https://github.com/${ORG}/${APP}

ENV CYPRESS_INSTALL_BINARY 0
ENV ENABLE_EXPERIMENTAL_COREPACK 1
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXTJS_IGNORE_ESLINT=1
ENV NEXTJS_IGNORE_TYPECHECK=1

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
RUN apk add --no-cache libc6-compat curl

RUN mkdir -p ${ROOT_DIR}/scripts ${ROOT_DIR}/paraglide/generated

WORKDIR ${ROOT_DIR}

###################################################################
# Stage 2: Build                                                  #
###################################################################
# TODO: separate install and build stages?

FROM base AS builder

ARG APP
ARG PNPM_VERSION
ARG API_URL
ARG ROOT_DIR

# Setup pnpm package manager
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

# COPY ${ROOT_DIR}/.env ${ROOT_DIR}/tsconfig.json ./

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --ignore-scripts

COPY . .

# # Copy all files necessary for building
# COPY --from=files ${ROOT_DIR}/out/full/ .
# COPY --from=files ${ROOT_DIR}/turbo.json .
# COPY --from=files ${ROOT_DIR}/@tempo/data ./@tempo/data
# # TODO
# COPY scripts ${ROOT_DIR}/scripts
# COPY messages ${ROOT_DIR}/messages
# COPY paraglide ${ROOT_DIR}/paraglide

# RUN ls && echo "" && echo ${NEXT_PUBLIC_API_URL} && echo "" && exit 1
RUN ls && ls scripts
RUN APP=${APP} NEXT_PUBLIC_API_URL=${API_URL} READ_DOTENV=1 pnpm build --filter=@tempo/dashboard && rm .env

###################################################################
# Stage 3: Extract a minimal image from the build                 #
###################################################################

FROM base AS final

ARG PORT

RUN chown -R nextjs:nodejs .

COPY --from=builder --chown=nextjs:nodejs ${ROOT_DIR}/@tempo/dashboard/.next/standalone/ .
COPY --from=builder --chown=nextjs:nodejs ${ROOT_DIR}/@tempo/dashboard/.next/static ./@tempo/dashboard/.next/static
# Note: The public dir also must be copied from the builder rather than from the host,
# since the service worker files from next-pwa are generated during the build.
COPY --from=builder --chown=nextjs:nodejs ${ROOT_DIR}/@tempo/dashboard/public ./@tempo/dashboard/public

RUN ls && mv @tempo/dashboard/server.js @tempo/dashboard/server.mjs

# Switch to non-root user.
USER nextjs

EXPOSE ${PORT}

ENV PORT ${PORT}

# Define health check.
HEALTHCHECK --interval=30s --timeout=7s --start-period=60s --retries=3 \
  CMD ["sh", "-c", "curl --fail http://localhost:${PORT}/ || exit 1"]

# Start the app.
CMD node @tempo/dashboard/server.mjs
