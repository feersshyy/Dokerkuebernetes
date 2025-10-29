# Etapa única: servir sitio estático con Nginx
FROM nginx:alpine

# Copia tu sitio al contenedor
COPY . /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

