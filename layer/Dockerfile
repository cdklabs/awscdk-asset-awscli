FROM public.ecr.aws/lambda/provided:latest

RUN mkdir -p /opt
WORKDIR /tmp

#
# tools
#

RUN yum update -y \
    && yum install -y zip unzip wget tar gzip

#
# aws cli
#

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install -i /opt/awscli -b /opt/awscli/bin

#
# organize for self-contained usage
#

RUN mv /opt/awscli/bin/aws /opt/awscli

#
# cleanup
#

RUN cd /opt/awscli/v2/2.7.35/dist/awscli/examples \
    && ls | grep -v "global_options.rst" | xargs rm -rf

#
# Test that the CLI works
#

RUN yum install -y groff
RUN /opt/awscli/aws help

#
# create the bundle
#

RUN cd /opt \
    && zip --symlinks -r ../layer.zip * \
    && echo "/layer.zip is ready" \
    && ls -alh /layer.zip;

WORKDIR /
ENTRYPOINT [ "/bin/bash" ]
