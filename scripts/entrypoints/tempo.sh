#!/bin/bash -x

# RSA_PRIVATE_KEY="$(< /.jwt_rsa.pem)"
# export RSA_PRIVATE_KEY

# update dependencies in dev to avoid requiring image rebuild
[[ "$ENVIRONMENT" = development ]] && poetry install --no-root
# python manage.py cleanup_django_defender  # TODO

# Set up the environment as needed.
python manage.py setup || exit 1

# Create a db backup, if there are any migrations to apply.
# python manage.py migrate --check || {
#     [[ "$ENVIRONMENT" = prod ]] && {
#         invoke db.backup || {
#             echo "Failed to create db backup."
#             exit 1
#         }
#     }
# }

# Apply migrations.
python manage.py migrate --no-input || {
    echo "Failed to run migrations."
    exit 1
}

# In dev environment, load fixtures.
[[ "$ENVIRONMENT" = development ]] && {
    fixtures_file="${ROOT_DIR}/apps/${APP}/fixtures/data.dev.json"
    if test -f "$fixtures_file"; then
        # TODO: opt in to resetdata
        python manage.py resetdata --no-input || {
            echo "Failed to load data."
            exit 1
        }
    else
        echo "No fixtures file found at $fixtures_file"
    fi
}

# Collect static files.
python manage.py collectstatic --no-input || {
    echo "Failed to collect static files."
    exit 1
}

# https://django-cachalot.readthedocs.io/en/latest/quickstart.html#manage-py-command
python manage.py invalidate_cachalot

# # Rebuild indexes.
# python manage.py search_index --rebuild -f || {
#     echo "Failed to rebuild elasticsearch indexes."
#     exit 1
# }

# if [ ! "$ENVIRONMENT" = prod ]; then
#     # Create superuser if necessary.
#     python manage.py createsuperuser --no-input --username="$DJANGO_SUPERUSER_EMAIL" --email="$DJANGO_SUPERUSER_EMAIL" &>/dev/null
# fi

exec "$@"
