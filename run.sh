#!/usr/bin/env bash
docker build -t dxapp_infopanelproxy_prod --no-cache .
docker rm -f dxapp-infopanelproxy-prod
docker run -itd --restart=always --name=dxapp-infopanelproxy-prod --network=dxapp_network_prod -p 8080:8080 dxapp_infopanelproxy_prod bash -c "npm start"
