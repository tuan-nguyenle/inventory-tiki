import { RabbitMQ, SearchProductToFindShelf, Subjects } from "@microservies-inventory/common";

export class SearchShelfPublisher extends RabbitMQ<SearchProductToFindShelf>{
    readonly queueName!: Subjects.ShelfSearch;
}