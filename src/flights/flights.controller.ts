import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flights } from './flights.entity';
import { Flight } from './flight.model';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightService: FlightsService) {}

  @Get()
  findAll(): Promise<Flights[]> {
    return this.flightService.findAll();
  }

  @Get("cities/origins")
  getOrigins(): Promise<string[]>{
    return this.flightService.getFlightOrigins();
  }

  @Get("cities/destinations")
  getDestinations(): Promise<string[]>{
    return this.flightService.getFlightDestinations();
  }

  @Get("/:id")
  findOne(@Param() param): Promise<Flights[]> {
    return this.flightService.findOne(param.id);
  }

  @Get("query/:orig/:dest")
  async query(@Param('orig') orig, @Param('dest') dest): Promise<any> {
    return this.flightService.query(orig, dest);
  }

  @Post()
  async create(@Body() flight:Flight): Promise<Flights[]> {
    return this.flightService.create(flight);
  }

  @Post(":id/update")
  async update(@Param('id') id:number, @Body() flight: Flight): Promise<any>{
    flight.id = id;
    return this.flightService.update(flight)
  }

  @Post(":id/delete")
  async delete(@Param('id') id:number): Promise<any>{
    return this.flightService.delete(id);
  }


}