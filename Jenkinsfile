pipeline {
  agent any

  environment {
    CYPRESS_CACHE_FOLDER = "${WORKSPACE}/.cache/Cypress"
    CYPRESS_RUN_COMMAND = "npx cypress run --browser firefox:dev --spec \"cypress/e2e/demoblaze.cy.js\""
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Local Jenkins without Git: skipping checkout. Ensure the project files are already present in the workspace.'
      }
    }

    stage('Install dependencies') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm ci'
          } else {
            bat 'npm ci'
          }
        }
      }
    }

    stage('Run Cypress tests') {
      steps {
        script {
          if (isUnix()) {
            sh "${CYPRESS_RUN_COMMAND}"
          } else {
            bat "${CYPRESS_RUN_COMMAND}"
          }
        }
      }
    }

    stage('Generate Allure report') {
      steps {
        script {
          if (isUnix()) {
            sh 'npm run allure:generate'
          } else {
            bat 'npm run allure:generate'
          }
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      script {
        if (isUnix()) {
          sh 'echo "Pipeline finished"'
        } else {
          bat 'echo Pipeline finished'
        }
      }
    }
  }
}
