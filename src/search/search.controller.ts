import { Controller, Get, Inject, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor (private searchService: SearchService) {}

    @Get()
    globalSearch(@Query('value') value: string) {
        return this.searchService.globalSearch(value)
    }
}
