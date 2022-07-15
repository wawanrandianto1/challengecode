package main

import (
	"fmt"
	"time"
)

func main() {
	total := 1000
	tmp := []int{}
	for i := 0; i < total; i++ {
		tmp = append(tmp, i)
	}
	startTime := time.Now()
	count := 0
	for i := 0; i < len(tmp); i++ {
		count++
	}
	fmt.Println("Kecepatan", time.Since(startTime))
}
