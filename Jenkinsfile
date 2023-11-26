pipeline {
    agent any
    tools {
        nodejs 'node'
    }
    environment {
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        FrontEndEnv = credentials('FrontEnv')
        BackEndEnv = credentials('BackEnv')
    }
    stages {
        stage('Clean Workspace Starting') {
            steps {
                cleanWs()
            }
        }
        
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/wizelineacademy/itesm-socioformador-ago-dec-2023-team-01.git'
            }
        }
        
        stage('set dot envs'){
            steps {
                sh 'cp -f $FrontEndEnv frontend'
                sh 'cp -f $BackEndEnv backend'
            }
        }
        
        stage('Stop pm2 processes') {
            steps {
                    sh 'pm2 stop 0 1'
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'while true; do echo "."; sleep 10; done & npm run build'
                }
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    sh 'npx prisma migrate dev'
                    sh 'npx prisma generate'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                dir('backend/tests') {
                    script {
                        def testResult = sh(script: './run_tests.sh', returnStatus: true)
                        if (testResult != 0) {
                            echo "Tests failed."

                            /*
                            sh 'pm2 start 0 1'
                            currentBuild.result = 'FAILURE'
                            error "Tests failed. Aborting the pipeline."
                            */
                        } else {
                            echo "Tests passed."
                        }
                    }
                }
            }
        }

        
        stage('Copy workspace') {
            steps {
                sh 'rm -rf /home/bitnami/htdocs/*'
                sh 'mkdir -p /home/bitnami/htdocs/itesm-socioformador-ago-dec-2023-team-01/'
                sh 'cp -r $WORKSPACE/* /home/bitnami/htdocs/itesm-socioformador-ago-dec-2023-team-01/'
            }
        }
        
        stage('Start pm2 processes') {
            steps {
                    sh 'pm2 start 0 1'
            }
        }
        
        stage('Clean Workspace Ending') {
            steps {
                cleanWs()
            }
        }
        
    }
}
