docker build -t zakiafada32/sc-auth:latest -t zakiafada32/sc-auth:$SHA -f ./auth/Dockerfile ./auth
docker build -t zakiafada32/sc-users:latest -t zakiafada32/sc-users:$SHA -f ./users/Dockerfile ./users

docker push zakiafada32/sc-auth:latest
docker push zakiafada32/sc-users:latest

docker push zakiafada32/sc-auth:$SHA
docker push zakiafada32/sc-users:$SHA

kubectl apply -f k8s
kubectl set image deployments/auth-deployment auth=zakiafada32/sc-auth:$SHA
kubectl set image deployments/server-deployment users=zakiafada32/sc-users:$SHA