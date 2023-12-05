pipeline {
    agent any

    tools {
        nodejs 'NodeJsNPM'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build and Test') {
            steps {
                script {
                    // Instalar dependencias
                    sh 'npm install'
                    
                    // Ejecutar pruebas
                    sh 'npm test'
                }
            }
        }
    }
}