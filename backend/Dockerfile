# -- Builder --
FROM python:3.12-alpine AS builder

RUN apk add --update --no-cache build-base

RUN addgroup --system --gid 1001 appuser && \
    adduser --system --uid 1001 appuser

USER appuser

ENV PATH="/home/appuser/.local/bin:$PATH"

WORKDIR /app

COPY poetry.lock pyproject.toml /app/

RUN python -m pip install poetry && poetry install --only main --no-root

# -- Runtime -- 
FROM builder AS runtime

# Copying the installed dependencies from the builder image
COPY --from=builder /app/ /app/

# Copying the rest of the application
COPY . /app/

USER appuser

CMD ["poetry", "run", "python", "-u", "main.py"]