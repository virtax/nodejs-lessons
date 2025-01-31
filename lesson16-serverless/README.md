## Example of simple AWS Lambda functions using serverless framework

Usage:
1. Register in AWS

2. Install framework:

   ```npm install -g serverless```

3. Deploy:

    ```serverless deploy```

Test local:

```serverless invoke local --function hello```

Test deployed:

```serverless invoke --function hello```

Check logs:

```serverless logs --function hello```


Other framework funtionality:

```serverless help```