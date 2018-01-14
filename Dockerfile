FROM node:8.2.1

RUN wget 'https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz'
RUN tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz -C /opt
RUN rm wkhtmltox-0.12.4_linux-generic-amd64.tar.xz
RUN ln -s /opt/wkhtmltox/bin/wkhtmltopdf /usr/bin/wkhtmltopdf
