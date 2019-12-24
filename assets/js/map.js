// Google map


            /** Defines the Popup class. */
            function definePopupClass() {
                /**
                 * A customized popup on the map.
                 * @param {!google.maps.LatLng} position
                 * @param {!Element} content
                 * @constructor
                 * @extends {google.maps.OverlayView}
                 */
                Popup = function (position, cls, content, anchorClass) {
                    this.position = position;

                    var div = document.createElement("div");
                    div.innerHTML = content;
                    content = div.childNodes[0];
                    content.classList.add('popup-bubble-content');
                    if (cls)
                        content.classList.add(cls);

                    var pixelOffset = document.createElement('div');
                    pixelOffset.classList.add('popup-bubble-anchor');
                    if (anchorClass) {
                        pixelOffset.classList.add(anchorClass);
                    }
                    pixelOffset.appendChild(content);

                    this.anchor = document.createElement('div');
                    this.anchor.classList.add('popup-tip-anchor');
                    this.anchor.appendChild(pixelOffset);

                    // Optionally stop clicks, etc., from bubbling up to the map.
                    this.stopEventPropagation();
                };

                // NOTE: google.maps.OverlayView is only defined once the Maps API has
                // loaded. That is why Popup is defined inside initMap().
                Popup.prototype = Object.create(google.maps.OverlayView.prototype);

                Popup.prototype.open = function () {
                    this.getPanes().floatPane.appendChild(this.anchor);
                };

                Popup.prototype.close = function () {
                    if (this.anchor.parentElement) {
                        this.anchor.parentElement.removeChild(this.anchor);
                    }
                };


                /** Called when the popup needs to draw itself. */
                Popup.prototype.draw = function () {
                    var divPosition = this.getProjection().fromLatLngToDivPixel(this.position);
                    // Hide the popup when it is far out of view.
                    var display =
                        Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000 ?
                            'block' :
                            'none';

                    if (display === 'block') {
                        this.anchor.style.left = divPosition.x + 'px';
                        this.anchor.style.top = divPosition.y + 'px';
                    }
                    if (this.anchor.style.display !== display) {
                        this.anchor.style.display = display;
                    }
                };

                /** Stops clicks/drags from bubbling up to the map. */
                Popup.prototype.stopEventPropagation = function () {
                    var anchor = this.anchor;
                    anchor.style.cursor = 'auto';

                    ['click', 'dblclick', 'contextmenu', 'wheel', 'mousedown', 'touchstart', 'pointerdown']
                        .forEach(function (event) {
                            anchor.addEventListener(event, function (e) {
                                e.stopPropagation();
                            });
                        });
                };
            }

            var data = [{"position":{"lat":16.8531086,"lng":-99.82365329999999},"city":"Acapulco","city_short":"Acapulco","country":"Mexico","country_code":"MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["TRANSFORMARTe"]},{"position":{"lat":27.1766701,"lng":78.00807450000002},"city":"Agra","city_short":"Agra","country":"India","country_code":"IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Rebuilding Socially Coherent Neighbourhoods for Sustainable Development of Agra"]},{"position":{"lat":23.022505,"lng":72.57136209999999},"city":"Ahmedabad","city_short":"Ahmedabad","country":" India","country_code":"IN","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Ahmedabad Sanitation Action Lab (ASAL)","Sabarmati Riverfront","Safe and Secure Ahmedabad"]},{"position":{"lat":52.3702157,"lng":4.895167899999933},"city":"Amsterdam","city_short":"Amsterdam","country":" Netherlands","country_code":" NL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Planning the Circular City: Lessons from Post-Industrial Amsterdam  "]},{"position":{"lat":36.8968908,"lng":30.713323299999956},"city":"Antalya","city_short":"Antalya","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["New Kepez Smart City"]},{"position":{"lat":-23.6509279,"lng":-70.39750219999996},"city":"Antofagasta","city_short":"Antofagasta","country":" Chile","country_code":" CL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Hill to Sea Promenades and Distributed Irrigation Plan for Antofagasta (SARA)  "]},{"position":{"lat":-25.2637399,"lng":-57.57592599999998},"city":"Asuncion","city_short":"Asuncion","country":" Paraguay","country_code":" PY","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Vivienda de Emergencia a Familias en Asentamientos Informales  "]},{"position":{"lat":33.7489954,"lng":-84.3879824},"city":"Atlanta","city_short":"Atlanta","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Atlanta BeltLine  "]},{"position":{"lat":19.8761653,"lng":75.3433139},"city":"Aurangabad","city_short":"Aurangabad","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Bajaj Majhi City, Swachh City (\"Bajaj My City, Clean City\")"]},{"position":{"lat":39.2903848,"lng":-76.61218930000001},"city":"Baltimore","city_short":"Baltimore","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Baltimore Wood Project"]},{"position":{"lat":13.7563309,"lng":100.50176510000006},"city":"Bangkok","city_short":"Bangkok","country":" Thailand","country_code":" TH","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["TOM-CASAVA  "]},{"position":{"lat":41.3850639,"lng":2.1734034999999494},"city":"Barcelona","city_short":"Barcelona","country":" Spain","country_code":" ES","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Barcelona's Orthogonal Bus Network","MESCLADIS","Superblock Pilot in Poblenou"]},{"position":{"lat":31.252973,"lng":34.791462000000024},"city":"Be'er Sheva","city_short":"Be'er Sheva","country":" Israel","country_code":" IL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["HaReshet - Young Adult Network for Civic Involvement   "]},{"position":{"lat":39.90419989999999,"lng":116.40739630000007},"city":"Beijing","city_short":"Beijing","country":" China","country_code":" CN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Pinstreet"]},{"position":{"lat":-19.9172987,"lng":-43.93455929999999},"city":"Belo Horizonte","city_short":"Belo Horizonte","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["BRT MOVE: Transforming Belo Horizonte Through Mobility","Building a Zero Waste Territory"]},{"position":{"lat":23.2599333,"lng":77.41261499999996},"city":"Bhopal","city_short":"Bhopal","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Integrated City Command and Control Centre (ICCC)","Public Bicycle Sharing System"]},{"position":{"lat":23.2419997,"lng":69.66693239999995},"city":"Bhuj","city_short":"Bhuj","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Rebuilding and Renewal of the Walled City of Bhuj"]},{"position":{"lat":4.710988599999999,"lng":-74.072092},"city":"Bogot\u00e1","city_short":"Bogot\u00e1","country":" Colombia","country_code":" CO","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Building Efficiency Accelerator (BEA) Program","Reconocimiento de los recicladores, protecci\u00f3n de su oficio y fortalecimiento de sus organizaciones como prestadores del servicio de aseo en su componente de aprovechamiento en Colombia","SWEVEN | CONCEPTOS PLASTICOS","Crezco Con Mi Barrio: URBAN 95 (\"Growing Up With My Neighborhood\")"]},{"position":{"lat":44.494887,"lng":11.342616200000066},"city":"Bologna","city_short":"Bologna","country":" Italy","country_code":" IT","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Welcoming Bologna: A Pilot Experience of European Welcoming Cities"]},{"position":{"lat":-22.8841808,"lng":-48.444165399999974},"city":"Botucatu","city_short":"Botucatu","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Programa Agricultura Urbana  "]},{"position":{"lat":-34.6036844,"lng":-58.381559100000004},"city":"Buenos Aires","city_short":"Buenos Aires","country":" Argentina","country_code":" AR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Metrobus del Bajo","Social and Urban Integration of Barrio 31"]},{"position":{"lat":-33.9248685,"lng":18.424055299999964},"city":"Cape Town","city_short":"Cape Town","country":" South Africa","country_code":" ZA","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["SDI's Urban Poor Fund International (UPFI)","The iShack Project","Violence Prevention Through Urban Upgrading"]},{"position":{"lat":24.8090649,"lng":-107.39401169999996},"city":"Culiacan","city_short":"Culiacan","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Parque Las Riberas  "]},{"position":{"lat":-6.792354,"lng":39.20832840000003},"city":"Dar Es Salaam","city_short":"Dar Es Salaam","country":" Tanzania","country_code":" TZ","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Mbezi Luis Agritourism Green Economy Complex","School Area Road Safety Assessments and Improvements (SARSAI) ","Tanzania Urbanisation Laboratory"]},{"position":{"lat":49.8958844,"lng":8.686177499999985},"city":"Darmstadt-Kranichstein","city_short":"Darmstadt-Kranichstein","country":" Germany","country_code":" DE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":[" Kranichstein Passive House  "]},{"position":{"lat":28.7040592,"lng":77.10249019999992},"city":"Delhi","city_short":"Delhi","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Search Bharat mission  "]},{"position":{"lat":42.331427,"lng":-83.0457538},"city":"Detroit","city_short":"Detroit","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Campus Martius Park  "]},{"position":{"lat":27.9711357,"lng":84.89847750000001},"city":"Dhading","city_short":"Dhading","country":" Nepal","country_code":" NP","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Picosoft - Connecting the Unconnected"]},{"position":{"lat":25.2048493,"lng":55.270782800000006},"city":"Dubai","city_short":"Dubai","country":" United Arab Emirates","country_code":" AE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Sustainable City   "]},{"position":{"lat":-29.85868039999999,"lng":31.021840399999974},"city":"Durban","city_short":"Durban","country":" South Africa","country_code":" ZA","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Urban Transformation through Sustained Engagement, Advocacy and Design: Integrating Informal Workers into Inner-City Durban"]},{"position":{"lat":39.7667061,"lng":30.525631100000055},"city":"Eskisehir","city_short":"Eskisehir","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Eskisehir Urban Development Project"]},{"position":{"lat":44.0520691,"lng":-123.08675360000001},"city":"Eugene","city_short":"Eugene","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Historic Mims House  "]},{"position":{"lat":43.0125274,"lng":-83.68745619999999},"city":"Flint, Michigan","city_short":"Flint, Michigan","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Flint Farmers Market   "]},{"position":{"lat":-6.7327144,"lng":-38.526998100000014},"city":"Fortaleza","city_short":"Fortaleza","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker4.svg","zIndex":9999,"projects":["Projeto \u00c1rvore na minha Cal\u00e7ada (\"A Tree on My Sidewalk\")","EcoPolo Fortaleza - Integrating Urban Mobility and Waste Management Policies","Fortaleza Online","Uma Crian\u00e7a, Uma \u00c1rvore (\"One Child, One Tree\") Project","Program for the Adoption of Squares and Green Areas","Recycling Attitudes in the City","Rua da Esperan\u00e7a (\"Hope Street\") Project","Special Zones of Urban and Socioeconomic Dynamization","Value Capture Strategies Through Charges on Additional Building Rights"]},{"position":{"lat":51.0543422,"lng":3.717424299999948},"city":"Ghent","city_short":"Ghent","country":" Belgium","country_code":" BE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Ghent en Garde   "]},{"position":{"lat":20.6596988,"lng":-103.34960920000003},"city":"Guadalajara","city_short":"Guadalajara","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Collection Interoperability System","Guadalajara's Urban Forest Network\/Red de Bosques Urbanos de Guadalajara","Zero-Waste Management Program"]},{"position":{"lat":28.4594965,"lng":77.02663830000006},"city":"Gurugram","city_short":"Gurugram","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Raahgiri Day  "]},{"position":{"lat":32.7940463,"lng":34.98957100000007},"city":"Haifa","city_short":"Haifa","country":" Israel","country_code":" IL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Robin Food"]},{"position":{"lat":20.044412,"lng":110.19828600000005},"city":"Haikou","city_short":"Haikou","country":" China","country_code":" CN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Comprehensive Complete Street Improvement in Sanjiaochi Area"]},{"position":{"lat":17.385044,"lng":78.486671},"city":"Hyderabad","city_short":"Hyderabad","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Banyan Nation","Green Zone  "]},{"position":{"lat":10.7201501,"lng":122.56210629999998},"city":"Iloilo City","city_short":"Iloilo City","country":" Philippines","country_code":" PH","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["HPFPI Community-led Citywide Development Approach to Slum Upgrading in Iloilo City, Philippines"]},{"position":{"lat":22.7195687,"lng":75.85772580000003},"city":"Indore","city_short":"Indore","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["iBus (Bus Rapit Transit System)"]},{"position":{"lat":37.7626487,"lng":30.553705000000036},"city":"Isparta","city_short":"Isparta","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["SULOD - Sustainable Local Development  "]},{"position":{"lat":41.0082376,"lng":28.97835889999999},"city":"Istanbul","city_short":"Istanbul","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Istanbul Metrobus","Kald\u0131r\u0131m Nerede? (\"Where is the sidewalk?\") Campaign","Floating Solar Power Plant Project","Bayrampasa Former Prison Urban Transformation Project"]},{"position":{"lat":38.423734,"lng":27.142826000000014},"city":"Izmir","city_short":"Izmir","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Fully-Electric Bus","IZBAN","Fully Adaptive Smart Transportation System"]},{"position":{"lat":-6.17511,"lng":106.86503949999997},"city":"Jakarta","city_short":"Jakarta","country":" Indonesia","country_code":" ID","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["PetaBencana.id","Community Waste Water Treatment in the Slum Area of West Jakarta"]},{"position":{"lat":24.8607343,"lng":67.00113639999995},"city":"Karachi","city_short":"Karachi","country":" Pakistan","country_code":" PK","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Urban Resource Centre"]},{"position":{"lat":10.9254398,"lng":79.83800559999997},"city":"Karaikal Municipality","city_short":"Karaikal Municipality","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Recycle for Life Municipal Solid Waste Management"]},{"position":{"lat":-1.9705786,"lng":30.10442880000005},"city":"Kigali","city_short":"Kigali","country":" Rwanda","country_code":" RW","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Automatic Fare Collection System  "]},{"position":{"lat":18.0178743,"lng":-76.80990409999998},"city":"Kingston","city_short":"Kingston","country":" Jamaica","country_code":" JM","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Sustainable Programme for Environmental Resilience (SUPER 18)  "]},{"position":{"lat":22.572646,"lng":88.36389499999996},"city":"Kolkata","city_short":"Kolkata","country":" India","country_code":" IN","icon":"\assets\/img\/marker3.svg","zIndex":9999,"projects":["Bharoshar Bharosa: The Promising Rain","Conservation of Architecture & Urban Heritage in Cities","Establishment of Millennium Park and Riverfront Development","Forum and Framework for Sustainable Development of Cities","Greening the City","Recycling of Urban Waste Water & Urban Agri-Aquaculture"]},{"position":{"lat":21.1250077,"lng":-101.68596049999996},"city":"Leon","city_short":"Leon","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Integrated Transport System OPTIBUS of Leon"]},{"position":{"lat":-12.0463731,"lng":-77.042754},"city":"Lima","city_short":"Lima","country":" Peru","country_code":" PE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Construyendo Comunidades Sostenibles, Inclusivas y Resilientes","Ocupa tu Calle (\"Occupy Your Street\")"]},{"position":{"lat":51.5073509,"lng":-0.12775829999998223},"city":"London","city_short":"London","country":" United Kingdom","country_code":" GB","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Global Generation","Hommy","London National Park City","One Planet Living Initiative"]},{"position":{"lat":34.0522342,"lng":-118.2436849},"city":"Los Angeles","city_short":"Los Angeles","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Los Angeles Transitions to 100% Electric Buses"]},{"position":{"lat":25.7904657,"lng":-108.985882},"city":"Los Mochis","city_short":"Los Mochis","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["30 km\/h Zone for Los Mochis City Center"]},{"position":{"lat":41.402742,"lng":27.36564599999997},"city":"L\u00fcleburgaz","city_short":"L\u00fcleburgaz","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Bicycle Year for Women"]},{"position":{"lat":5.06768,"lng":-75.50982},"city":"Manizales","city_short":"Manizales","country":" Colombia","country_code":" CO","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Ecoparks Network of Biomanizales"]},{"position":{"lat":23.2494148,"lng":-106.41114249999998},"city":"Mazatlan","city_short":"Mazatlan","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Regeneraci\u00f3n Integral del Centro Hist\u00f3rico de Mazatl\u00e1n"]},{"position":{"lat":6.244203,"lng":-75.58121189999997},"city":"Medellin","city_short":"Medellin","country":" Colombia","country_code":" CO","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Air Quality Management Plan - PIGECA","Hogar\u00a0Ecol\u00f3gico:\u00a0Estrategia de educaci\u00f3n ambiental rural en la jurisdicci\u00f3n de CORANTIOQUIA","Metrocable","TUAP (Tactical Urban Action Plans)"]},{"position":{"lat":20.9673702,"lng":-89.59258569999997},"city":"Merida","city_short":"Merida","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Municipal Green Infrastructure Plan","Public Urban Orchards"]},{"position":{"lat":19.4326077,"lng":-99.13320799999997},"city":"Mexico City","city_short":"Mexico City","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker4.svg","zIndex":9999,"projects":["Catalyzing Rainwater Harvesting in Mexico City","Francisco I. Madero Pedestrian Corridor","Integral Space for Food","Isla Urbana","Keeping Mexico City Afloat","La Viga Linear Park","Massive Bicycle Parking facilities in La Raza and Pantitl\u00e1n and Semi-Massive Bicycle Parking Facility in La Villa-Basilica","Metrob\u00fas: El BRT que cambi\u00f3 la movilidad en la Ciudad de M\u00e9xico","Public Pocket Parks Program"]},{"position":{"lat":31.112818,"lng":121.38171599999998},"city":"Minhang Shanghai","city_short":"Minhang Shanghai","country":" China","country_code":" CN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["TODTOWN  "]},{"position":{"lat":6.2907432,"lng":-10.760523899999953},"city":"Monrovia","city_short":"Monrovia","country":" Liberia","country_code":" LR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Emergency Monrovia Sanitation (EMUS) Project"]},{"position":{"lat":19.0759837,"lng":72.87765590000004},"city":"Mumbai","city_short":"Mumbai","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Better Your Neighbourhood Project (BYN)","Transforming M Ward Project"]},{"position":{"lat":-1.2920659,"lng":36.82194619999996},"city":"Nairobi","city_short":"Nairobi","country":" Kenya","country_code":" KE","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Changing Faces Competition (CFC): Engaging Citizens in Public Space Management","Kambi Moto Slum Upgrading Project","Nairobi Community Recycling Project"]},{"position":{"lat":28.6139391,"lng":77.20902120000005},"city":"New Delhi","city_short":"New Delhi","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Integrated Waste Management Model for Urban Agglomerations"]},{"position":{"lat":40.7127753,"lng":-74.0059728},"city":"New York","city_short":"New York","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["1.5\u00b0C: Aligning NYC with the Paris Climate Agreement","The Times Square Transformation"]},{"position":{"lat":40.142458,"lng":28.81306749999999},"city":"Nil\u00fcfer Municipality","city_short":"Nil\u00fcfer Municipality","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Delivering LIveable Cities Thru Neighborhood Democracy"]},{"position":{"lat":-22.8858975,"lng":-43.115221099999985},"city":"Niteroi","city_short":"Niteroi","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Clean Inlet - Enseada Limpa","Geo-information Management System (SIGEO) from Niter\u00f3i City Hall, comprising the Multi-purpose Technical Registry (CTM) of Niter\u00f3i, accessible through Internet (SIG-WEB)"]},{"position":{"lat":37.8043637,"lng":-122.2711137},"city":"Oakland","city_short":"Oakland","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Civic Design Lab, Oakland\u2019s Model for Civic Transformation","Telegraph Ave Street Redesign: A NACTO + Oakland Collaboration"]},{"position":{"lat":38.9822282,"lng":-94.6707917},"city":"Overland Park, Kansas","city_short":"Overland Park, Kansas","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["InterUrban ArtHouse"]},{"position":{"lat":20.1010608,"lng":-98.75913109999999},"city":"Pachuca","city_short":"Pachuca","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Mining Archaeological Route"]},{"position":{"lat":-30.0346471,"lng":-51.217658400000005},"city":"Porto Alegre","city_short":"Porto Alegre","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Estrat\u00e9gia de Resili\u00eancia de Porto Alegre"]},{"position":{"lat":41.7003713,"lng":-73.92097009999998},"city":"Poughkeepsie","city_short":"Poughkeepsie","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Hudson Valley Design Lab"]},{"position":{"lat":18.5204303,"lng":73.85674369999992},"city":"Pune","city_short":"Pune","country":" India","country_code":" IN","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Innovative Pedal Kit for Bicycle, Pedicabs & Pedal-Rickshaws","Pune Street Programme, Pune Municipal Corporation","Pune Street Programme, Pune Municipal Corporation"]},{"position":{"lat":-0.1806532,"lng":-78.46783820000002},"city":"Quito","city_short":"Quito","country":" Ecuador","country_code":" EC","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Urban Agriculture Project AGRUPAR"]},{"position":{"lat":33.9715904,"lng":-6.849812899999961},"city":"Rabat","city_short":"Rabat","country":" Morocco","country_code":" MA","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["VisualMetric"]},{"position":{"lat":22.3038945,"lng":70.80215989999999},"city":"Rajkot","city_short":"Rajkot","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Replacement of All Existing HPSV Street Lights with LED Street Lights"]},{"position":{"lat":-8.0522404,"lng":-34.928609600000016},"city":"Recife","city_short":"Recife","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Bota pra Rodar (\"Let it Ride Again\")","Porto Digital Technology Park"]},{"position":{"lat":-22.9068467,"lng":-43.17289649999998},"city":"Rio De Janeiro","city_short":"Rio De Janeiro","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["VLT Carioca"]},{"position":{"lat":6.144837,"lng":-75.37508500000001},"city":"Rionegro","city_short":"Rionegro","country":" Colombia","country_code":" CO","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["BiciRio and Z.E.R. (Regulated Parking Zones) from SISTEMA OPERATIVO DE MOVILIDAD ORIENTE SOSTENIBLE (SOMOS)"]},{"position":{"lat":-12.977749,"lng":-38.5016301},"city":"Salvador","city_short":"Salvador","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Salvador Capital da Mata Atl\u00e2ntica"]},{"position":{"lat":10.4837342,"lng":123.41289559999996},"city":"San Carlos City","city_short":"San Carlos City","country":" Philippines","country_code":" PH","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Malungtarong Lungsod: The San Carlos City Sustainable City Project"]},{"position":{"lat":19.3863928,"lng":-99.22556250000002},"city":"Santa Fe","city_short":"Santa Fe","country":" Mexico","country_code":" MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Escuelas de Trabajo","La Mexicana Metropolitan Park"]},{"position":{"lat":-33.4488897,"lng":-70.6692655},"city":"Santiago","city_short":"Santiago","country":" Chile","country_code":" CL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Paseo Bandera","Sharing Streets, Changing Minds"]},{"position":{"lat":3.4516467,"lng":-76.5319854},"city":"Santiago De Cali","city_short":"Santiago De Cali","country":" Colombia","country_code":" CO","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Plan Jarillon de Cali"]},{"position":{"lat":-23.5505199,"lng":-46.63330939999997},"city":"Sao Paulo","city_short":"Sao Paulo","country":" Brazil","country_code":" BR","icon":"\assets\/img\/marker2.svg","zIndex":9999,"projects":["Bike Ita\u00fa","Programa de Combate ao Desperd\u00cdcio de Alimentos","Trabalho Novo"]},{"position":{"lat":23.8820139,"lng":90.28078679999999},"city":"Savar","city_short":"Savar","country":" Bangladesh","country_code":" BD","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Mud to Mortar"]},{"position":{"lat":22.483951,"lng":113.917959},"city":"SheKou","city_short":"SheKou","country":" China","country_code":" CN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["SheKou Community Car Free Day   "]},{"position":{"lat":39.185113,"lng":27.608791999999994},"city":"Soma","city_short":"Soma","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["SOMA DISTRICT HEATING PROJECT"]},{"position":{"lat":34.9495672,"lng":-81.9320482},"city":"Spartanburg","city_short":"Spartanburg","country":" USA","country_code":" US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["STEAM Garden  "]},{"position":{"lat":59.32932349999999,"lng":18.068580800000063},"city":"Stockholm","city_short":"Stockholm","country":"  Sweden","country_code":"  SE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Stockholm Act Principles  "]},{"position":{"lat":-7.575488699999999,"lng":110.82432719999997},"city":"Surakarta City","city_short":"Surakarta City","country":" Indonesia","country_code":" ID","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Security of Tenure by Co-Creation Approach"]},{"position":{"lat":41.3275459,"lng":19.81869819999997},"city":"Tirana","city_short":"Tirana","country":" Albania","country_code":" AL","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["EBRD Green City Development"]},{"position":{"lat":-25.6051205,"lng":28.392941699999938},"city":"Tshwane","city_short":"Tshwane","country":" South Africa","country_code":" ZA","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Green Cafe  "]},{"position":{"lat":23.1793013,"lng":75.78490970000007},"city":"Ujjain","city_short":"Ujjain","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Smart Classrooms for Government Schools at Ujjain"]},{"position":{"lat":19.091182,"lng":72.92086359999996},"city":"Vikhroli, Mumbai","city_short":"Vikhroli, Mumbai","country":" India","country_code":" IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["The Trees"]},{"position":{"lat":31.476822,"lng":103.59038599999997},"city":"Wenchuan County","city_short":"Wenchuan County","country":" China","country_code":" CN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Post-Disaster Recovery Plan"]},{"position":{"lat":40.990635,"lng":28.89614000000006},"city":"Zeytinburnu-Istanbul","city_short":"Zeytinburnu-Istanbul","country":" Turkey","country_code":" TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Family Women Supporting and Disable People Centre"]},{"position":{"lat":50.25465,"lng":28.65866690000007},"city":"Zhytomyr","city_short":"Zhytomyr","country":" Ukraine","country_code":" UA","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Climate Drops"]},{"position":{"lat":9.006938,"lng":38.73472},"city":"Addis Ababa","city_short":"Addis Ababa","country":"Ethiopia","country_code":"ET","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Road Cleaners"]},{"position":{"lat":-22.739574,"lng":-47.329838},"city":"Americana City","city_short":"Americana City","country":"Brazil","country_code":"BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Sustainable Vegetable Gardens"]},{"position":{"lat":-36.861172,"lng":174.761026},"city":"Auckland","city_short":"Auckland","country":"New Zealand","country_code":"NZ","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Auckland City Centre SSP"]},{"position":{"lat":41.62008,"lng":41.624459},"city":"Batumi","city_short":"Batumi","country":"Georgia","country_code":"GE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Green Cities: Integrated Sustainable Urban Transport for the City of Batumi and the Achara Region"]},{"position":{"lat":32.273251,"lng":72.899722},"city":"Bhalwal","city_short":"Bhalwal","country":"Pakistan","country_code":"PK","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Changa Pani Program"]},{"position":{"lat":51.455852,"lng":-2.587973},"city":"Bristol","city_short":"Bristol","country":"United Kingdom","country_code":"GB","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["National Cycle Network (SUSTRANS)"]},{"position":{"lat":-37.739867,"lng":144.953078},"city":"City of Moreland","city_short":"City of Moreland","country":"Australia","country_code":"AU","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Virtual Moreland Project"]},{"position":{"lat":-17.663024,"lng":-71.334701},"city":"Ilo Province","city_short":"Ilo Province","country":"Peru","country_code":"PE","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Construyendo Transparencia y Participaci\u00f3n Ciudadana en los Procesos de Presupuesto Participativo en la Provincia de Ilo al sur de Per\u00fa"]},{"position":{"lat":40.772095,"lng":29.94925},"city":"Izmit","city_short":"Izmit","country":"Turkey","country_code":"TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Izmit Tram Line and Bikesharing Project"]},{"position":{"lat":26.896053,"lng":75.791893},"city":"Jaipur","city_short":"Jaipur","country":"India","country_code":"IN","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Enhancing Transparency and Accountability in Municipal Finances"]},{"position":{"lat":-22.731472,"lng":-47.35441},"city":"Jardim S\u00e3o Roque, Americana","city_short":"Jardim S\u00e3o Roque, Americana","country":"Brazil","country_code":"BR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["I'm responsible for the place I live"]},{"position":{"lat":-26.169271,"lng":28.05057},"city":"Johannesburg","city_short":"Johannesburg","country":"South Africa","country_code":"ZA","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Integrated Public Transport Information Platform for Emerging Cities"]},{"position":{"lat":10.304925,"lng":123.905422},"city":"Metro Cebu","city_short":"Metro Cebu","country":"Philippines","country_code":"PH","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Mega Cebu Vision 2050 in Collaboration with Yokohama City"]},{"position":{"lat":30.018341,"lng":-90.007589},"city":"New Orleans","city_short":"New Orleans","country":"USA","country_code":"US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Living With Water \u2013 The Greater New Orleans Urban Water Plan"]},{"position":{"lat":20.592822,"lng":-100.39924},"city":"Queretaro","city_short":"Queretaro","country":"Mexico","country_code":"MX","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Proposal for designing safe pedestrian and cyclist crossings in congested road junctions for Queretaro City","Quer\u00e9taro Municipal Cycling Infrastructure Program"]},{"position":{"lat":37.76836,"lng":-122.410514},"city":"San Francisco","city_short":"San Francisco","country":"USA","country_code":"US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["SFpark Pilot Program & San Francisco Citywide Demand Responsive Parking Pricing"]},{"position":{"lat":29.203245,"lng":25.519489},"city":"Siwa Oasis, Marsa Matrouh","city_short":"Siwa Oasis, Marsa Matrouh","country":"Egypt","country_code":"EG","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Taziry Ecovillages Siwa"]},{"position":{"lat":41.022292,"lng":29.047338},"city":"\u00dcsk\u00fcdar","city_short":"\u00dcsk\u00fcdar","country":"Turkey","country_code":"TR","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["\u00dcsk\u00fcdar Square Transformation Project"]},{"position":{"lat":38.910308,"lng":-77.027969},"city":"Washington, DC","city_short":"Washington, DC","country":"USA","country_code":"US","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["OpenAQ"]},{"position":{"lat":12.9715987,"lng":77.59456269999998},"city":"Bengaluru","city_short":"Bengaluru","country":"India","country_code":"IN","icon":"\assets\/img\/marker3.svg","zIndex":9999,"projects":["Building Resilience Through Traditional Livelihoods Around Rainwater Harvesting and Groundwater Recharge","Carbonlites","CYCLE DAY","Project Tender S.U.R.E (Specifications for Urban Roads Execution)","Restoration of an Urban Common Through Community Integration","Saahas Zero Waste"]},{"position":{"lat":5.4356,"lng":100.3091},"city":"Penang","city_short":"Penang","country":"Malaysia","country_code":"MY","icon":"\assets\/img\/marker1.svg","zIndex":9999,"projects":["Gender-Responsive and Participatory Budgeting (GRPB) for Low-Cost Housing "]},{"id":"246","position":{"lat":-29.8579,"lng":31.0292},"title":"Warwick Junction","sub_title":"Co-creating a more inclusive city","place":"Durban, South Africa","image":"https:\/\/wrirossprize.org\/sites\/default\/files\/2019-03\/Durban-small-gradient.jpg","icon":{"url":"\assets\/img\/group_12.svg","anchor":[0,46]},"zIndex":99999},{"id":"247","position":{"lat":18.5204,"lng":73.8567},"title":"SWaCH Pune Seva Sahakari Sanstha","sub_title":"Integrating informal workers for cleaner streets","place":"Pune, India","image":"https:\/\/wrirossprize.org\/sites\/default\/files\/2019-04\/SWaCH-small-gradient_0.jpg","icon":{"url":"\assets\/img\/group_12.svg","anchor":[0,46]},"zIndex":99999},{"id":"248","position":{"lat":-6.7924,"lng":39.2083},"title":"SARSAI","sub_title":"School Area Road Safety Assessments and Improvements","place":"Dar es Salaam, Tanzania","image":"https:\/\/wrirossprize.org\/sites\/default\/files\/2019-04\/SARSAI-small-gradient_0_1.jpg","icon":{"url":"\assets\/img\/group_winner_12.svg","anchor":[0,46]},"zIndex":99999},{"id":"249","position":{"lat":6.2442,"lng":-75.581},"title":" Metrocable","sub_title":"Shifting the boundaries of urban opportunity","place":"Medell\u00edn, Colombia","image":"https:\/\/wrirossprize.org\/sites\/default\/files\/2019-04\/eskisehir-small-gradient_0_2.jpg","icon":{"url":"\assets\/img\/group_12.svg","anchor":[0,46]},"zIndex":99999},{"id":"254","position":{"lat":39.7667,"lng":30.5256},"title":"Eski\u015fehir Urban Development Project","sub_title":"Reinvigorating a river and a city","place":"Eskisehir, Turkey","image":"https:\/\/wrirossprize.org\/sites\/default\/files\/2019-04\/eskisehir-small-gradient_0_1.jpg","icon":{"url":"\assets\/img\/group_12.svg","anchor":[0,46]},"zIndex":99999}];

            function showPopup(id) {
                var id = '#popup-finalists' + id;
                $(id + ", .mask").fadeIn(300);
                $(id).css("top", $(window).scrollTop() + 20);
                $(".wrapper").addClass("opened");
                $("html, body").css("overflow", "hidden");
                jQuery(document).ready(function ($) {
                    $(id).niceScroll({cursorcolor: "#ffae16", autohidemode: false});
                });
            }


            function initMap() {

                definePopupClass();

                var styles = [

                    {
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.land_parcel",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#bdbdbd"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.neighborhood",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "stylers": [
                            {
                                "color": "#ffc58e"
                            },
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#757575"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dadada"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#616161"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.line",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e5e5e5"
                            }
                        ]
                    },
                    {
                        "featureType": "transit.station",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#eeeeee"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#9e9e9e"
                            }
                        ]
                    }

                ];

                var zoomMap;

                if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    zoomMap = 0.5;
                } else if (/webOS|iPad/i.test(navigator.userAgent)) {
                    zoomMap = 1.6;
                } else {
                    zoomMap = 2.1;
                }


                var map = new google.maps.Map(document.getElementById('gmap'), {
                    center: {lat: 56, lng: 10},
                    zoom: zoomMap,
                    // maxZoom: 2.1,
                    // draggable: false,
                    // scaleControl: false,
                    // scrollwheel: true,
                    disableDefaultUI: false,
                    streetViewControl: false,
                    mapTypeControlOptions: {
                        mapTypeIds: []
                    },
                    optimized: false,
                });

                var currentPopup;
                google.maps.event.addListener(map, "click", function () {
                    if (currentPopup)
                        currentPopup.close();
                });

                document.addEventListener('keyup', function (e) {
                    if (e.keyCode == 27 && currentPopup)
                        currentPopup.close();
                });

                data.forEach(function (d) {
                    var anchor;
                    d.map = map;
                    if (anchor = (d.icon || {}).anchor) {
                        d.icon.anchor = new google.maps.Point(anchor[0], anchor[1]);
                    }
                    var m = new google.maps.Marker(d);
                    var anchorClass = '';
                    if (d.city) {
                        var projects = [];
                        d.projects.forEach(function (name) {
                            projects.push("<li class=\"infowindow__item\">" + name + "</li>");
                        });
                        var contentString =
                            '<div class="infowindow">' +
                            '<span class="infowindow__close"></span>' +
                            '<div class="infowindow__header">' +
                                                            '<img class="infowindow__img" src="assets/img/flags/' + d.country_code.trim().toLowerCase() + '.svg">' +
                            '<h3>' + d.city + '</h3>' +
                            '<p>' + d.country.trim() + '</p>' +
                            '<span class="infowindow__sum">' + d.projects.length + '</span>' +
                            '</div>' +
                            '<div class="infowindow__divider"></div>' +
                            '<div class="infowindow__content">' +
                            '<ul class="infowindow__list">' +
                            projects.join("") +
                            '</ul>' +
                            '</div>' +
                            '</span>';
                    } else {
                        var contentString =
                            '<div class="winner-popup">' +
                            '<span class="infowindow__close"></span>' +
                            '<div class="winner-popup__info">' +
                            '<div class="winner-popup__header" onclick="showPopup(' + d.id + ');">' + d.title + '</div>' +
                            '<div class="winner-popup__desc">' + d.sub_title + '</div>' +
                            '<div class="winner-popup__place">' + d.place + '</div>' +
                            '</div>' +
                                                            '<div class="winner-popup__image"><img src="' + d.image + '" alt=""></div>' +
                            '</div>';
                        anchorClass = 'winner-anchor';
                    }

                    var cls = d.position.lng < -99 ? 'left' : d.position.lng > 110 ? 'right' : '';
                    var popup = new Popup(new google.maps.LatLng(d.position.lat, d.position.lng), cls, contentString, anchorClass);
                    popup.setMap(map);
                    google.maps.event.addListener(m, "click", function () {
                        if (currentPopup)
                            currentPopup.close();
                        popup.open(map, m);
                        currentPopup = popup;
                        var closePopupBtn = currentPopup.anchor.querySelector('.infowindow__close');
                        closePopupBtn.addEventListener('click', function () {
                            currentPopup.close();
                        });
                    });
                });
                map.setOptions({styles: styles});
            }