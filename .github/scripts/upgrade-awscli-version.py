import subprocess
import semver

# pull the data from dockerhub
data = subprocess.Popen(('curl', '-L', '-s', 'https://registry.hub.docker.com/v2/repositories/amazon/aws-cli/tags?page_size=100'), stdout=subprocess.PIPE)
# query for only tags
tagbytes = subprocess.check_output(('jq', '.results[].name'), stdin=data.stdout)
data.wait()

tags = tagbytes.decode("utf-8").replace('"','').split('\n')
# trusting that tags are coming back in order from newest to oldest
# we could go through all tags that come but I trust this assumption
# some tags are 'latest' and 'amd64', so not valid semver. we skip these.
latest_version = ''
for tag in tags:
  try:
    semver.VersionInfo.parse(tag)
    latest_version = tag
    break
  except ValueError:
    continue

# sed Dockerfile with new version
# if its the same version, then no changes should happen
subprocess.Popen(('sed', '-i', '', '-e', "/amazon\\/aws-cli:/s/:.*/:%s/"%(latest_version), 'layer/Dockerfile'), stdout=subprocess.PIPE)