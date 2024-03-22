FROM python:3.12-alpine

WORKDIR /app

COPY poetry.lock pyproject.toml /app/

RUN apk add --update --no-cache curl build-base

RUN curl -sSL https://install.python-poetry.org | python3 -

ENV PATH="/root/.local/bin:$PATH"
RUN poetry install --only main

COPY . .

CMD ["poetry", "run", "python", "-u", "main.py"]