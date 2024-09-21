import re
import semver
import subprocess

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

dockerfile_path = '../../layer/Dockerfile'
pattern_compiled = re.compile(r"^(FROM amazon/aws-cli:).*")
with open(dockerfile_path, "r") as dockerfile:
  lines = dockerfile.readlines()
with open(dockerfile_path, "w") as sources:
  for line in lines:
    sources.write(re.sub(pattern_compiled, r'\g<1>'+latest_version, line))
