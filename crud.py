import json

def read_data(filename: str) -> dict:
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

def read_location(city: str, filename: str) -> dict:

    data = read_data(filename)

    locations = data.get('locations')

    for location in locations:
        if location['name_of_location'] == city:
            latitude = location.get("latitude")
            longitude = location.get("longitude")
            description = location.get("description")
            photos = location.get("photos")
            print(city, latitude, longitude, description, photos)
            
            return location
        
def write_data(new_data: dict, filename: str):

    with open(filename, 'w') as file:
        json.dump(new_data, file, indent=2)          

def add_new_location(new_location: dict, filename: str):

    # 1. Reading file                                       
    data = read_data(filename)
    # print(data)

    # 2. Modify the data (locations)
    locations = data.get('locations', [])
    # print(locations)
    
    locations.append(new_location)

    data['locations'] = locations
    
    # 3. Writing a file
    write_data(data, filename)

    # have return value

def delete_location(city: str, filename: str):

    data = read_data(filename)

    locations = data.get('locations')

    # update_locations = [location for location in locations if location['name of location'] != city]
    update_locations = []
    for location in locations:
        if location['name_of_location'] != city:
            update_locations.append(location)
            
    data["locations"] = update_locations

    write_data(data, filename)
