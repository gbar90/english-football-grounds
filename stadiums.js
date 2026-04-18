const STADIUMS = [
    {
        name: "Old Trafford",
        club: "Manchester United",
        league: "premier",
        lat: 53.4631,
        lng: -2.2913,
        capacity: 74310,
        built: 1910,
        image: "images/old-trafford.jpg",
        facts: [
            "Known as 'The Theatre of Dreams', a nickname coined by Bobby Charlton",
            "Second-largest football stadium in the UK",
            "Was bombed during World War II and rebuilt in 1949"
        ]
    },
    {
        name: "Emirates Stadium",
        club: "Arsenal",
        league: "premier",
        lat: 51.5549,
        lng: -0.1084,
        capacity: 60704,
        built: 2006,
        image: "images/emirates-stadium.jpg",
        facts: [
            "Cost approximately £390 million to build",
            "Arsenal moved here from Highbury after 93 years",
            "The roof collects rainwater to irrigate the pitch"
        ]
    },
    {
        name: "Anfield",
        club: "Liverpool",
        league: "premier",
        lat: 53.4308,
        lng: -2.9609,
        capacity: 61276,
        built: 1884,
        image: "images/anfield.jpg",
        facts: [
            "Originally the home of Everton before a rent dispute in 1892",
            "The famous 'This Is Anfield' sign hangs in the tunnel",
            "The Kop end was named after Spion Kop, a battle in the Boer War"
        ]
    },
    {
        name: "Etihad Stadium",
        club: "Manchester City",
        league: "premier",
        lat: 53.4831,
        lng: -2.2004,
        capacity: 53400,
        built: 2002,
        image: "images/etihad-stadium.jpg",
        facts: [
            "Originally built for the 2002 Commonwealth Games",
            "Manchester City moved here from Maine Road in 2003",
            "Plans announced to expand to over 60,000 seats"
        ]
    },
    {
        name: "Stamford Bridge",
        club: "Chelsea",
        league: "premier",
        lat: 51.4817,
        lng: -0.191,
        capacity: 40341,
        built: 1877,
        image: "images/stamford-bridge.jpg",
        facts: [
            "One of the oldest football grounds in England, opened in 1877",
            "Has been Chelsea's home since the club was founded in 1905",
            "The pitch is one of the narrowest in the Premier League"
        ]
    },
    {
        name: "Tottenham Hotspur Stadium",
        club: "Tottenham Hotspur",
        league: "premier",
        lat: 51.6042,
        lng: -0.0662,
        capacity: 62850,
        built: 2019,
        image: "images/tottenham-hotspur-stadium.jpg",
        facts: [
            "Cost over £1 billion, one of the most expensive stadiums ever built",
            "Features the world's first dividing retractable pitch for NFL games",
            "Has its own microbrewery and the longest bar in Europe"
        ]
    },
    {
        name: "St James' Park",
        club: "Newcastle United",
        league: "premier",
        lat: 54.9756,
        lng: -1.6217,
        capacity: 52305,
        built: 1892,
        image: "images/st-james-park.jpg",
        facts: [
            "Located in the heart of Newcastle city centre on a hilltop",
            "Has been a football ground since 1880",
            "Sir Bobby Robson's statue stands outside the Milburn Stand"
        ]
    },
    {
        name: "Villa Park",
        club: "Aston Villa",
        league: "premier",
        lat: 52.5092,
        lng: -1.8847,
        capacity: 42657,
        built: 1897,
        image: "images/villa-park.jpg",
        facts: [
            "Has hosted more FA Cup semi-finals than any other ground",
            "The Holte End was once the largest terrace in England",
            "A church is embedded within the Trinity Road Stand"
        ]
    },
    {
        name: "London Stadium",
        club: "West Ham United",
        league: "premier",
        lat: 51.5387,
        lng: -0.0166,
        capacity: 62500,
        built: 2011,
        image: "images/london-stadium.jpg",
        facts: [
            "Built for the 2012 London Olympics as the Olympic Stadium",
            "West Ham moved here from the Boleyn Ground (Upton Park) in 2016",
            "The conversion from athletics to football cost an additional £323 million"
        ]
    },
    {
        name: "Falmer Stadium",
        club: "Brighton & Hove Albion",
        league: "premier",
        lat: 50.8616,
        lng: -0.0834,
        capacity: 31800,
        built: 2011,
        image: "images/falmer-stadium.jpg",
        facts: [
            "Took 12 years of planning battles before construction was approved",
            "Also known as the Amex Stadium after sponsor American Express",
            "Set in the South Downs on the outskirts of Brighton"
        ]
    },
    {
        name: "Molineux Stadium",
        club: "Wolverhampton Wanderers",
        league: "premier",
        lat: 52.5903,
        lng: -2.1306,
        capacity: 31750,
        built: 1889,
        image: "images/molineux-stadium.jpg",
        facts: [
            "One of the first grounds in the world to install floodlights in the 1950s",
            "The famous floodlit matches helped inspire European competition",
            "Named after the Molineux House which once stood on the site"
        ]
    },
    {
        name: "Selhurst Park",
        club: "Crystal Palace",
        league: "premier",
        lat: 51.3983,
        lng: -0.0855,
        capacity: 25486,
        built: 1924,
        image: "images/selhurst-park.jpg",
        facts: [
            "Shared by Wimbledon FC and Charlton Athletic at different times",
            "The Holmesdale Road End has one of the most passionate fan groups in England",
            "Located in a residential area of South London"
        ]
    },
    {
        name: "Goodison Park",
        club: "Everton",
        league: "premier",
        lat: 53.4389,
        lng: -2.9664,
        capacity: 39414,
        built: 1892,
        image: "images/goodison-park.jpg",
        facts: [
            "Just 0.6 miles from Liverpool's Anfield — the closest derby in English football",
            "Hosted games during the 1966 World Cup",
            "Everton are moving to a new stadium at Bramley-Moore Dock"
        ]
    },
    {
        name: "Vitality Stadium",
        club: "AFC Bournemouth",
        league: "premier",
        lat: 50.7352,
        lng: -1.8383,
        capacity: 11364,
        built: 1910,
        image: "images/vitality-stadium.jpg",
        facts: [
            "The smallest ground in the Premier League",
            "Originally known as Dean Court, named after Cooper Dean who donated the land",
            "Bournemouth were in League Two as recently as 2010 before their meteoric rise"
        ]
    },
    {
        name: "Brentford Community Stadium",
        club: "Brentford",
        league: "premier",
        lat: 51.4907,
        lng: -0.2887,
        capacity: 17250,
        built: 2020,
        image: "images/brentford-community-stadium.jpg",
        facts: [
            "Brentford moved here from Griffin Park, their home for 116 years",
            "Griffin Park was famous for having a pub on each corner of the ground",
            "The stadium is shared with rugby union side London Irish"
        ]
    },
    {
        name: "City Ground",
        club: "Nottingham Forest",
        league: "premier",
        lat: 52.94,
        lng: -1.1325,
        capacity: 30445,
        built: 1898,
        image: "images/city-ground.jpg",
        facts: [
            "Separated from Notts County's Meadow Lane by just the River Trent",
            "The two grounds are the closest professional football stadiums in England",
            "Forest won two European Cups here under Brian Clough"
        ]
    },
    {
        name: "Portman Road",
        club: "Ipswich Town",
        league: "premier",
        lat: 52.0545,
        lng: 1.1447,
        capacity: 30311,
        built: 1884,
        image: "images/portman-road.jpg",
        facts: [
            "Has been Ipswich Town's home since 1884",
            "Sir Alf Ramsey and Sir Bobby Robson both managed here before managing England",
            "The club returned to the Premier League in 2024 after 22 years away"
        ]
    },
    {
        name: "Gtech Community Stadium",
        club: "Fulham",
        league: "premier",
        lat: 51.4749,
        lng: -0.2217,
        capacity: 25700,
        built: 1896,
        image: "images/craven-cottage.jpg",
        facts: [
            "Better known as Craven Cottage, one of football's most iconic grounds",
            "The 'cottage' in the corner is a real listed building from 1780",
            "Sits right on the banks of the River Thames in Fulham"
        ]
    },
    {
        name: "King Power Stadium",
        club: "Leicester City",
        league: "premier",
        lat: 52.6204,
        lng: -1.1422,
        capacity: 32312,
        built: 2002,
        image: "images/king-power-stadium.jpg",
        facts: [
            "Leicester won the Premier League here in 2015/16 as 5000-1 outsiders",
            "Originally called the Walkers Stadium after the crisp manufacturer",
            "A memorial garden honours the late chairman Vichai Srivaddhanaprabha"
        ]
    },
    {
        name: "St Mary's Stadium",
        club: "Southampton",
        league: "premier",
        lat: 50.9058,
        lng: -1.3911,
        capacity: 32384,
        built: 2001,
        image: "images/st-marys-stadium.jpg",
        facts: [
            "Replaced The Dell, Southampton's home for over 100 years",
            "Named after St Mary's Church, linked to the club's founding",
            "Located near the waterfront and Southampton's historic docks"
        ]
    },
    {
        name: "Elland Road",
        club: "Leeds United",
        league: "championship",
        lat: 53.7779,
        lng: -1.5722,
        capacity: 37890,
        built: 1897,
        image: "images/elland-road.jpg",
        facts: [
            "One of only four English grounds to have hosted a European semi-final, World Cup match, and full international",
            "The Bremner statue outside honours the legendary Billy Bremner",
            "Has been in continuous use since 1897"
        ]
    },
    {
        name: "Turf Moor",
        club: "Burnley",
        league: "championship",
        lat: 53.789,
        lng: -2.2302,
        capacity: 21944,
        built: 1883,
        image: "images/turf-moor.jpg",
        facts: [
            "One of the longest continuously used football grounds in the world",
            "The ground hosted the first-ever game broadcast live on the BBC in 1938",
            "Burnley have played here since 1883"
        ]
    },
    {
        name: "Hillsborough Stadium",
        club: "Sheffield Wednesday",
        league: "championship",
        lat: 53.4114,
        lng: -1.5006,
        capacity: 39732,
        built: 1899,
        image: "images/hillsborough-stadium.jpg",
        facts: [
            "Named after the Hillsborough area of Sheffield",
            "Hosted matches during the 1966 World Cup",
            "The Hillsborough disaster memorial is located at the ground as a permanent tribute"
        ]
    },
    {
        name: "Riverside Stadium",
        club: "Middlesbrough",
        league: "championship",
        lat: 54.5782,
        lng: -1.2173,
        capacity: 34742,
        built: 1995,
        image: "images/riverside-stadium.jpg",
        facts: [
            "The first major new-build football stadium in England since the Taylor Report",
            "Located on the south bank of the River Tees",
            "Hosted three matches during the Euro 1996 championships"
        ]
    },
    {
        name: "Loftus Road",
        club: "Queens Park Rangers",
        league: "championship",
        lat: 51.5093,
        lng: -0.2321,
        capacity: 18439,
        built: 1904,
        image: "images/loftus-road.jpg",
        facts: [
            "One of the most compact and atmospheric grounds in English football",
            "Fans are extremely close to the pitch, creating an intense atmosphere",
            "Located in the Shepherd's Bush area of west London"
        ]
    },
    {
        name: "Bramall Lane",
        club: "Sheffield United",
        league: "championship",
        lat: 53.3703,
        lng: -1.4709,
        capacity: 32050,
        built: 1855,
        image: "images/bramall-lane.jpg",
        facts: [
            "The oldest major football stadium in the world still in use, opened in 1855",
            "Originally a cricket ground — first football match here was in 1862",
            "Hosted the first-ever floodlit football match in 1878"
        ]
    },
    {
        name: "Stadium of Light",
        club: "Sunderland",
        league: "championship",
        lat: 54.9146,
        lng: -1.3882,
        capacity: 49000,
        built: 1997,
        image: "images/stadium-of-light.jpg",
        facts: [
            "Built on the site of the former Monkwearmouth Colliery coal mine",
            "The name references the Davy lamp used by miners, not Benfica's stadium",
            "Has the largest capacity of any Championship ground"
        ]
    },
    {
        name: "Kenilworth Road",
        club: "Luton Town",
        league: "championship",
        lat: 51.8842,
        lng: -0.4316,
        capacity: 11500,
        built: 1905,
        image: "images/kenilworth-road.jpg",
        facts: [
            "Famously accessed through a row of terraced houses on Oak Road",
            "One of the quirkiest grounds in professional football",
            "The away entrance requires fans to walk through residential streets"
        ]
    },
    {
        name: "Coventry Building Society Arena",
        club: "Coventry City",
        league: "championship",
        lat: 52.4481,
        lng: -1.4965,
        capacity: 32609,
        built: 2005,
        image: "images/coventry-arena.jpg",
        facts: [
            "Originally known as the Ricoh Arena",
            "Coventry spent time groundsharing at Birmingham before returning here",
            "Also hosted Wasps rugby and major concerts"
        ]
    },
    {
        name: "Cardiff City Stadium",
        club: "Cardiff City",
        league: "championship",
        lat: 51.4728,
        lng: -3.2031,
        capacity: 33280,
        built: 2009,
        image: "images/cardiff-city-stadium.jpg",
        facts: [
            "Replaced the beloved Ninian Park in 2009",
            "Named after the club rather than a sponsor",
            "Also hosts Wales international football matches"
        ]
    },
    {
        name: "Ewood Park",
        club: "Blackburn Rovers",
        league: "championship",
        lat: 53.7286,
        lng: -2.4892,
        capacity: 31367,
        built: 1890,
        image: "images/ewood-park.jpg",
        facts: [
            "Blackburn won the Premier League title in 1994/95 while playing here",
            "The Jack Walker Stand honours the benefactor who funded the title-winning team",
            "Has been Blackburn's home since 1890"
        ]
    },
    {
        name: "Swansea.com Stadium",
        club: "Swansea City",
        league: "championship",
        lat: 51.6428,
        lng: -3.9351,
        capacity: 21088,
        built: 2005,
        image: "images/swansea-stadium.jpg",
        facts: [
            "Previously known as the Liberty Stadium",
            "Shared with rugby union side Ospreys",
            "Swansea became the first Welsh club to play in the Premier League while here"
        ]
    },
    {
        name: "Vicarage Road",
        club: "Watford",
        league: "championship",
        lat: 51.6498,
        lng: -0.4017,
        capacity: 22200,
        built: 1922,
        image: "images/vicarage-road.jpg",
        facts: [
            "The Graham Taylor stand is named after their legendary manager",
            "Elton John, the club's former chairman, has played concerts here",
            "Located in a residential area right next to a hospital"
        ]
    },
    {
        name: "Ashton Gate",
        club: "Bristol City",
        league: "championship",
        lat: 51.44,
        lng: -2.6202,
        capacity: 27000,
        built: 1904,
        image: "images/ashton-gate.jpg",
        facts: [
            "Underwent a major £45 million redevelopment completed in 2016",
            "Also used by Bristol Bears rugby union",
            "The Lansdown Stand offers views across to the Clifton Suspension Bridge"
        ]
    },
    {
        name: "MKM Stadium",
        club: "Hull City",
        league: "championship",
        lat: 53.7465,
        lng: -0.368,
        capacity: 25586,
        built: 2002,
        image: "images/mkm-stadium.jpg",
        facts: [
            "Previously known as the KC Stadium and KCOM Stadium",
            "Shared with Hull FC rugby league team",
            "One of the first purpose-built stadiums of the 21st century in England"
        ]
    },
    {
        name: "Bloomfield Road",
        club: "Blackpool",
        league: "championship",
        lat: 53.8046,
        lng: -3.0483,
        capacity: 16616,
        built: 1901,
        image: "images/bloomfield-road.jpg",
        facts: [
            "One of the closest football grounds to the sea in England",
            "Matthews, Mortensen and the famous 1953 FA Cup Final team played here",
            "Hosted England internationals in the early 1900s"
        ]
    },
    {
        name: "Millwall Den (The Den)",
        club: "Millwall",
        league: "championship",
        lat: 51.4859,
        lng: -0.0509,
        capacity: 20146,
        built: 1993,
        image: "images/the-den.jpg",
        facts: [
            "Millwall fans create one of the most intimidating atmospheres in football",
            "The club's motto is 'No One Likes Us, We Don't Care'",
            "Located in South Bermondsey in southeast London"
        ]
    },
    {
        name: "bet365 Stadium",
        club: "Stoke City",
        league: "championship",
        lat: 52.9884,
        lng: -2.1754,
        capacity: 30089,
        built: 1997,
        image: "images/bet365-stadium.jpg",
        facts: [
            "Originally called the Britannia Stadium",
            "Famous for its cold, windy conditions — inspiring the famous phrase",
            "bet365, the sponsor, was founded by Stoke's owning Coates family"
        ]
    },
    {
        name: "Carrow Road",
        club: "Norwich City",
        league: "championship",
        lat: 52.6221,
        lng: 1.3093,
        capacity: 27244,
        built: 1935,
        image: "images/carrow-road.jpg",
        facts: [
            "Built on the site of a former chalk pit and refuse dump",
            "Delia Smith, the famous TV cook, is the club's joint majority shareholder",
            "Her halftime cry 'Let's be having you!' became a famous football moment"
        ]
    },
    {
        name: "Pride Park",
        club: "Derby County",
        league: "championship",
        lat: 52.9149,
        lng: -1.4474,
        capacity: 33597,
        built: 1997,
        image: "images/pride-park.jpg",
        facts: [
            "Was opened by Queen Elizabeth II",
            "Replaced the historic Baseball Ground in 1997",
            "Located next to Derby railway station, easily visible from trains"
        ]
    },
    {
        name: "Fratton Park",
        club: "Portsmouth",
        league: "championship",
        lat: 50.7962,
        lng: -1.0637,
        capacity: 20688,
        built: 1898,
        image: "images/fratton-park.jpg",
        facts: [
            "One of the most traditional old-school grounds in English football",
            "Pompey won the FA Cup in 2008 while in the Premier League",
            "The club was fan-owned after going through administration"
        ]
    },
    {
        name: "Deepdale",
        club: "Preston North End",
        league: "championship",
        lat: 53.7725,
        lng: -2.6884,
        capacity: 23404,
        built: 1878,
        image: "images/deepdale.jpg",
        facts: [
            "One of the oldest football grounds in the world, in use since 1878",
            "Preston were the first-ever Football League champions in 1888/89",
            "The Tom Finney Stand features an iconic splash sculpture"
        ]
    },
    {
        name: "Plymouth Argyle Home Park",
        club: "Plymouth Argyle",
        league: "championship",
        lat: 50.3882,
        lng: -4.1508,
        capacity: 18600,
        built: 1893,
        image: "images/home-park.jpg",
        facts: [
            "The most southerly and westerly league ground in England",
            "Plymouth is one of the most geographically isolated clubs in the EFL",
            "The Mayflower Grandstand was opened in 2001"
        ]
    },
    {
        name: "Oakwell",
        club: "Barnsley",
        league: "championship",
        lat: 53.5524,
        lng: -1.4677,
        capacity: 23287,
        built: 1888,
        image: "images/oakwell.jpg",
        facts: [
            "Barnsley have played here since the club's formation in 1887",
            "The ground is named after the Oakwell area of Barnsley",
            "The West Stand was designed by the same architects as several Premier League grounds"
        ]
    },
    {
        name: "John Smith's Stadium",
        club: "Huddersfield Town",
        league: "championship",
        lat: 53.6543,
        lng: -1.7684,
        capacity: 24169,
        built: 1994,
        image: "images/john-smiths-stadium.jpg",
        facts: [
            "Originally known as the Alfred McAlpine Stadium, then the Galpharm Stadium",
            "Shared with rugby league side Huddersfield Giants",
            "Huddersfield were the first club to win three consecutive league titles (1924-26)"
        ]
    },
    {
        name: "Kassam Stadium",
        club: "Oxford United",
        league: "championship",
        lat: 51.7164,
        lng: -1.2086,
        capacity: 12500,
        built: 2001,
        image: "images/kassam-stadium.jpg",
        facts: [
            "Uniquely has only three sides — the fourth end was never built",
            "Named after former chairman Firoz Kassam",
            "Oxford won promotion to the Championship for the first time since 1999"
        ]
    }
];
