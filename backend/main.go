package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"
)

type Repo struct {
	StargazersCount int `json:"stargazers_count"`
}

type Metrics struct {
	TotalStars        int    `json:"total_stars"`
	TotalContributors int    `json:"total_contributors"`
	ActiveProjects    int    `json:"active_projects"`
	Status            string `json:"status"`
}

type Member struct {
	Name     string `json:"name"`
	Role     string `json:"role"`
	Github   string `json:"github"`
	Avatar   string `json:"avatar"`
	Specialty string `json:"specialty"`
}

// Caché simple para evitar el Rate Limit de GitHub
var lastKnownMetrics Metrics = Metrics{
	TotalStars:        11, // Valor real aproximado para evitar el 0 al inicio
	TotalContributors: 4,
	ActiveProjects:    5,
	Status:            "Cargando...",
}

func fetchGitHubMetrics() Metrics {
	fmt.Println("🌐 Llamando a la API de GitHub...")
	client := &http.Client{Timeout: 10 * time.Second}
	req, _ := http.NewRequest("GET", "https://api.github.com/orgs/Atomic-Linux-Team/repos", nil)
	req.Header.Set("User-Agent", "Atomic-Backend-Bot")

	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("❌ Error de red: %v\n", err)
		return lastKnownMetrics 
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Printf("⚠️ GitHub respondió con error: %s\n", resp.Status)
		return lastKnownMetrics
	}

	var repos []Repo
	if err := json.NewDecoder(resp.Body).Decode(&repos); err != nil {
		fmt.Printf("❌ Error decodificando JSON: %v\n", err)
		return lastKnownMetrics
	}

	totalStars := 0
	for _, repo := range repos {
		totalStars += repo.StargazersCount
	}

	newMetrics := Metrics{
		TotalStars:        totalStars,
		TotalContributors: 4,
		ActiveProjects:    len(repos),
		Status:            "Operational",
	}

	lastKnownMetrics = newMetrics
	fmt.Printf("✅ Métricas actualizadas: %d estrellas, %d proyectos\n", totalStars, len(repos))
	return newMetrics
}

func metricsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	data := fetchGitHubMetrics()

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func membersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// El verdadero equipo de Atomic Linux Team
	members := []Member{
		{
			Name:      "Angelito",
			Role:      "Gestor de Proyecto Principal",
			Github:    "https://github.com/Diamantito-Cup",
			Avatar:    "https://github.com/Diamantito-Cup.png",
			Specialty: "Project Management, Documentation, UI/UX Design",
		},
		{
			Name:      "Axxel",
			Role:      "Traductor y Organizador",
			Github:    "https://github.com/Axxel-otl",
			Avatar:    "https://github.com/Axxel-otl.png",
			Specialty: "Documentation Translation & Organization",
		},
		{
			Name:      "Brainiac",
			Role:      "Contribuidor de Software",
			Github:    "https://github.com/Brainitech",
			Avatar:    "https://github.com/Brainitech.png",
			Specialty: "Creator of Brain_Shell (QuickShell-based bar)",
		},
		{
			Name:      "Enki",
			Role:      "Desarrollador Python",
			Github:    "https://github.com/Enki1800XD",
			Avatar:    "https://github.com/Enki1800XD.png",
			Specialty: "Python Scripting & Experiments",
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(members)
}

func main() {
	http.HandleFunc("/api/metrics", metricsHandler)
	http.HandleFunc("/api/members", membersHandler)

	// Render asigna el puerto dinámicamente a través de la variable de entorno PORT
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Fallback para desarrollo local
	}

	fmt.Printf("🚀 Atomic Backend (Robust Mode) starting on :%s...\n", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		fmt.Printf("Error starting server: %s\n", err)
	}
}
