server {
    listen ${LISTEN_PORT};

    location /static {
        alias /vol/static;
    }

    location /api {
        uwsgi_pass                  ${APP_HOST}:${APP_PORT};
        include                     /etc/nginx/uwsgi_params;
        client_max_body_size 10M;
    }

    location / {
        proxy_pass http://18.116.59.53:${FRONTEND_PORT};
    }
}
