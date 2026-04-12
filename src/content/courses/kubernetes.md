# Kubernetes Orchestration

Welcome to the Cloud Native DevOps curriculum. Today we'll cover the basics of modern container orchestrations using K8s.

## The Problem with Raw Containers

Docker solves "it works on my machine". But who solves "the docker container crashed, restart it" and "we need 50 copies of this container because of Black Friday traffic, and they all need to communicate securely"?

Kubernetes (K8s) is the conductor of your container orchestra.

## Key Abstractions

### 1. Pods
The smallest deployable unit in K8s. A Pod encapsulates an application container, storage resources, a unique network IP, and options that dictate how the container should run.

### 2. Deployments
You almost never deploy a Pod directly. Instead, you declare a `Deployment`. `Deployments` control ReplicaSets, ensuring that the exact requested number of Pods are running at all times.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3 # K8s will ensure 3 NGINX pods are alive!
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

### 3. Services
Pods are mortal. They are born and they die. When a Pod dies, K8s restarts it, but it gets a **new IP address**. 
A `Service` gives you a persistent IP and DNS name to talk to a rotating set of Pods.

## Summary
K8s operates on a desired state pattern. You hand the Master Node a YAML file, and the Control Plane infinitely loops to make reality match your YAML document.
