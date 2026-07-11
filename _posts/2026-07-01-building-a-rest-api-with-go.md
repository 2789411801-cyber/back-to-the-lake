---
title: "Building a REST API with Go: A Practical Guide"
date: 2026-07-01
categories: [Technology, Tutorial]
tags: [go, api, backend, rest]
---

Go (or Golang) is an excellent choice for building REST APIs. Its standard library includes almost everything you need, and the resulting binary is a single, statically-linked executable.

## Setting Up

Start with a simple HTTP server using only the standard library:

```go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Message struct {
    Text string `json:"text"`
}

func handler(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(Message{Text: "Hello, world!"})
}

func main() {
    http.HandleFunc("/api/hello", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

## Structuring the Project

For larger projects, organize your code into packages:

- `handlers/` — HTTP request handling
- `models/` — Data types and DB interactions
- `middleware/` — Auth, logging, CORS
- `config/` — Environment configuration

## Routing with Chi

While `net/http` handles basic routing, a lightweight router like `chi` makes life easier:

```go
r := chi.NewRouter()
r.Use(middleware.Logger)
r.Get("/api/posts", listPosts)
r.Post("/api/posts", createPost)
```

## Conclusion

Go's simplicity is its superpower. You don't need a massive framework — just good structure and the excellent tools already at your disposal.
