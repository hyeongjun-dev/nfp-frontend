#!/bin/bash
pm2 start npm --name "nfp-frontend-local" -- run "start:local"
