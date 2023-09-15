FROM node:18.0.0
# создание директории приложения
WORKDIR /usr/src/app
# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности
# скопировать оба файла: package.json и package-lock.json
COPY package*.json ./
#команда npm install, которая установит зависимости Вашего приложения
RUN npm install
# копируем исходный код
COPY . .
EXPOSE 3000
CMD  npm start

#компиляция 
#docker build -t test -f .\Dockerfile .
#docker build --tag node-docker:1.0.0 .
#--tag node-docker:1.0.0 - параметр говорит о том, что наш новый образ, будет иметь название node-docker и будет отмечен тегом 1.0.0.
#. - точка в конце означает текущую директорию, а точнее - директорию с Dockerfile'ом

#запуск
#docker run -p 81:3000 -d  test/node-web-app
#-d позволяет контейнеру работать в фоновом режиме
#-p перенаправляет публичный порт на приватный порт внутри контейнера
#docker run -p 8000:9876 -d --name node-docker-try node-docker:1.0.0
#--name node-docker-try - параметр, который позволяет задать имя контейнера, с нашим приложением. Если этот параметр явно не указать, то Docker сгенерирует название контейнера за нас.
#node-docker:1.0.0 - в качестве обязательного параметра команды docker run идёт указание названия Docker-образа и тега (версии), из которого и будет запущен контейнер.

#отобразить все контейнеры, чтобы получить id нужного нам
#docker ps
#войти в контейнер в интерактивном режиме 
#$ docker exec -it <container id> /bin/bash 