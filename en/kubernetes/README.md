### Create namespace and namespace user

reference : https://jeremievallee.com/2018/05/28/kubernetes-rbac-namespace-user.html

```sh
kubectl create -f yaml/bloomtrace-api-access.yaml
```

### Get secrets

```sh
kubectl describe sa bloomtrace-api-user -n bloomtrace-api

bloomtrace-api-user-token-xxxxx
```

### Get tokens

```sh
kubectl get secret bloomtrace-api-user-token-xxxxx -n bloomtrace-api -o "jsonpath={.data.token}" | base64 -d
```

### Get Certificate

```sh
kubectl get secret bloomtrace-api-user-token-xxxxx -n bloomtrace-api -o "jsonpath={.data['ca\.crt']}" | base64 -d
```

### Create Kube config

```yaml
# bloomtrace-api-config.yaml
apiVersion: v1
kind: Config
preferences: {}

# Define the cluster
clusters:
- cluster:
    certificate-authority-data: PLACE CERTIFICATE HERE
    # You'll need the API endpoint of your Cluster here:
    server: https://YOUR_KUBERNETES_API_ENDPOINT
  name: my-cluster

# Define the user
users:
- name: bloomtrace-api-user
  user:
    as-user-extra: {}
    client-key-data: PLACE CERTIFICATE HERE
    token: PLACE USER TOKEN HERE

# Define the context: linking a user to a cluster
contexts:
- context:
    cluster: my-cluster
    namespace: bloomtrace-api
    user: bloomtrace-api-user
  name: bloomtrace-api

# Define current context
current-context: bloomtrace-api
```

### Pack Config for gitlab

```sh
cat bloomtrace-api-config.yaml | base64 | pbcopy
```
