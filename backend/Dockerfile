FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf \
    /etc/apache2/apache2.conf

RUN apt-get update && apt-get install -y \
    zip unzip git curl \
    libpng-dev libonig-dev libxml2-dev

RUN docker-php-ext-install pdo pdo_mysql mbstring gd
RUN a2enmod rewrite

WORKDIR /var/www/html

COPY . .
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader
RUN chown -R www-data:www-data storage bootstrap/cache
RUN chmod -R 775 storage bootstrap/cache
EXPOSE 80

