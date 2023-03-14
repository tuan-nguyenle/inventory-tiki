#!/usr/bin/env bash
clean_all() {
    docker system prune -a
}

execute() {
    case ${task} in
    clean)
        clean_all
        ;;
    *)
        docker exec -it khoa_luan-backend-nodejs-1 $commands
        ;;
    esac
}

main() {
    local task=$1
    local commands=$@
    execute ${task}
}

main $@
