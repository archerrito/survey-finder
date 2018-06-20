function localtunnel {
  lt -s dfgl3kjl6kddfg --port 5000
}
until localtunnel; do
echo "localtunnel server crashed"
sleep 2
done