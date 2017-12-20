# TimestampMS
Simple API for freecodecamp project Timestamp Microservice. Returns the unix and string versions of a unix or string date from GET query.

Use:
/ts?<string_date> or /ts?<unix_timestamp>

Returns:

If query is valid, JSON in the format of:

{ unix: <unix_timestamp>, natural: <string_timestamp> } with status 200

If query is invalid, JSON in the format of: 

{ unix: null, natural: null } with status 405
