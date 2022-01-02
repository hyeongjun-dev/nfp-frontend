#!/bin/bash
pm2 start npm --name "nfp-frontend-prod" -- run "start:prod"