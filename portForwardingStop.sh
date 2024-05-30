#!/bin/bash

# Read process ID from the file
if [ -e "/tmp/port_forwarding_pid" ]; then
    ssh_pid=$(cat /tmp/port_forwarding_pid)
else
    echo "Error: Port forwarding process ID file not found."
    exit 1
fi

# Kill the port forwarding process
kill "$ssh_pid"

# Remove the file
rm /tmp/port_forwarding_pid
