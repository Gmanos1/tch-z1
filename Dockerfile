FROM node:alpine as STAGE1
ADD src /app
WORKDIR /app
RUN npm install

FROM alpine
ENV PORT=3000
LABEL AUTOR="Konrad Miziński"
RUN apk add nodejs
COPY --from=STAGE1 /app /app
WORKDIR /app
EXPOSE ${PORT}
ENTRYPOINT [ "node", "index.js" ]