#!/bin/bash

# Check if the PID file exists
if [ -f /tmp/port_forwarding_pid ]; then
    # Read process ID from the file
    existing_pid=$(cat /tmp/port_forwarding_pid)
    # Check if the process is running
    if ps -p $existing_pid > /dev/null; then
        echo "Port forwarding is already running with PID $existing_pid. Killing the existing process."
        # Kill the existing process
        kill $existing_pid
    fi
fi

# Read secrets from Vault

# Define Vault address and token
VAULT_ADDR="http://192.180.3.143:8200"
VAULT_TOKEN="s.w8lLGcBLJveBBZLAmdyLBInG"

# Path to the secret in Vault KV
SECRET_PATH="kv/data/firewall"

# Function to retrieve secret from Vault
get_secret() {
    local secret_key="$1"
    curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" "${VAULT_ADDR}/v1/${SECRET_PATH}" | jq -r ".data.data.${secret_key}"
}

# Remote server details
remote_user=$(get_secret "USER")
remote_host=$(get_secret "HOST")
remote_port="5433"
remote_password=$(get_secret "PASSWORD")

# Local port to forward
local_port="5433"

# Start SSH tunnel for port forwarding with password authentication
sshpass -p "$remote_password" ssh -o StrictHostKeyChecking=no -N -L "$local_port:localhost:$remote_port" "$remote_user@$remote_host" &

# Capture the PID of the SSH process
ssh_pid=$!

# Store the process ID in a file
echo "$ssh_pid" > /tmp/port_forwarding_pid
