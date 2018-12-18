---
title: '[YAML]YAML文件详解'
category: YML
tag: YML
date: 2018-12-16 00:00:00
---

yml文件以 `缩进` 表示层级关系

```yaml
server:
  port: 8080

spring:
  dubbo:
    registry: http://localhost
```

- 注释：  `#`
- 文档开始符： `---`
- 文档结束符： `...`
- key-value:  `key:  value`
- 文档块：  `|`
```yaml
spring:
  sendgrid:
    api-key: |
      -----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw6Pjfb269gif0hdo0VZn
      UkcAVNN1SrkyglM9jz8/eDYGHUAM1IBaQVYlEhNaCoDt1hhmuthVlhmNk+xAgtlF
      XLMkqHRL5IDxQkPO/whnxHY4PPWMLM4VINH4FDvEYPd5aC2wPetfLH2ETHc0szBg
      hNtzTASdeN15FTUNuR5HlGoy2bQjsEBeb7qBYrIWdh0mwMpgM9pykMaczNtbEct/
      jJ3799OaHCRnj0TpmhMVnU2X1AWfH0I1lhfkV+/+azq49WPD7Kkeiv+PO9NEZIia
      ntZe+wuWTj4i3NgITtNFc9x+XMoKtvqxaOZvvcPJxlBo9GltfvWiUmaLK9na7kid
      iwIDAQAB
      -----END PUBLIC KEY-----
```