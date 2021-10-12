let _ = require('org.tts.js.lodash')
let Fs = require('fs'), Path = require('path')

let type = 'satellite-v9'
//let zoom=15;let data={'023100212030320':[-110.874023,38.074041,-110.863037,38.08269],'023100212030321':[-110.863037,38.074041,-110.852051,38.08269],'023100212030330':[-110.852051,38.074041,-110.841064,38.08269],'023100212030331':[-110.841064,38.074041,-110.830078,38.08269],'023100212031220':[-110.830078,38.074041,-110.819092,38.08269],'023100212031221':[-110.819092,38.074041,-110.808105,38.08269],'023100212031230':[-110.808105,38.074041,-110.797119,38.08269],'023100212031231':[-110.797119,38.074041,-110.786133,38.08269],'023100212031320':[-110.786133,38.074041,-110.775146,38.08269],'023100212031321':[-110.775146,38.074041,-110.76416,38.08269],'023100212030302':[-110.874023,38.08269,-110.863037,38.091337],'023100212030303':[-110.863037,38.08269,-110.852051,38.091337],'023100212030312':[-110.852051,38.08269,-110.841064,38.091337],'023100212030313':[-110.841064,38.08269,-110.830078,38.091337],'023100212031202':[-110.830078,38.08269,-110.819092,38.091337],'023100212031203':[-110.819092,38.08269,-110.808105,38.091337],'023100212031212':[-110.808105,38.08269,-110.797119,38.091337],'023100212031213':[-110.797119,38.08269,-110.786133,38.091337],'023100212031302':[-110.786133,38.08269,-110.775146,38.091337],'023100212031303':[-110.775146,38.08269,-110.76416,38.091337],'023100212030300':[-110.874023,38.091337,-110.863037,38.099983],'023100212030301':[-110.863037,38.091337,-110.852051,38.099983],'023100212030310':[-110.852051,38.091337,-110.841064,38.099983],'023100212030311':[-110.841064,38.091337,-110.830078,38.099983],'023100212031200':[-110.830078,38.091337,-110.819092,38.099983],'023100212031201':[-110.819092,38.091337,-110.808105,38.099983],'023100212031210':[-110.808105,38.091337,-110.797119,38.099983],'023100212031211':[-110.797119,38.091337,-110.786133,38.099983],'023100212031300':[-110.786133,38.091337,-110.775146,38.099983],'023100212031301':[-110.775146,38.091337,-110.76416,38.099983],'023100212030122':[-110.874023,38.099983,-110.863037,38.108628],'023100212030123':[-110.863037,38.099983,-110.852051,38.108628],'023100212030132':[-110.852051,38.099983,-110.841064,38.108628],'023100212030133':[-110.841064,38.099983,-110.830078,38.108628],'023100212031022':[-110.830078,38.099983,-110.819092,38.108628],'023100212031023':[-110.819092,38.099983,-110.808105,38.108628],'023100212031032':[-110.808105,38.099983,-110.797119,38.108628],'023100212031033':[-110.797119,38.099983,-110.786133,38.108628],'023100212031122':[-110.786133,38.099983,-110.775146,38.108628],'023100212031123':[-110.775146,38.099983,-110.76416,38.108628],'023100212030120':[-110.874023,38.108628,-110.863037,38.117272],'023100212030121':[-110.863037,38.108628,-110.852051,38.117272],'023100212030130':[-110.852051,38.108628,-110.841064,38.117272],'023100212030131':[-110.841064,38.108628,-110.830078,38.117272],'023100212031020':[-110.830078,38.108628,-110.819092,38.117272],'023100212031021':[-110.819092,38.108628,-110.808105,38.117272],'023100212031030':[-110.808105,38.108628,-110.797119,38.117272],'023100212031031':[-110.797119,38.108628,-110.786133,38.117272],'023100212031120':[-110.786133,38.108628,-110.775146,38.117272],'023100212031121':[-110.775146,38.108628,-110.76416,38.117272],'023100212030102':[-110.874023,38.117272,-110.863037,38.125915],'023100212030103':[-110.863037,38.117272,-110.852051,38.125915],'023100212030112':[-110.852051,38.117272,-110.841064,38.125915],'023100212030113':[-110.841064,38.117272,-110.830078,38.125915],'023100212031002':[-110.830078,38.117272,-110.819092,38.125915],'023100212031003':[-110.819092,38.117272,-110.808105,38.125915],'023100212031012':[-110.808105,38.117272,-110.797119,38.125915],'023100212031013':[-110.797119,38.117272,-110.786133,38.125915],'023100212031102':[-110.786133,38.117272,-110.775146,38.125915],'023100212031103':[-110.775146,38.117272,-110.76416,38.125915],'023100212030100':[-110.874023,38.125915,-110.863037,38.134557],'023100212030101':[-110.863037,38.125915,-110.852051,38.134557],'023100212030110':[-110.852051,38.125915,-110.841064,38.134557],'023100212030111':[-110.841064,38.125915,-110.830078,38.134557],'023100212031000':[-110.830078,38.125915,-110.819092,38.134557],'023100212031001':[-110.819092,38.125915,-110.808105,38.134557],'023100212031010':[-110.808105,38.125915,-110.797119,38.134557],'023100212031011':[-110.797119,38.125915,-110.786133,38.134557],'023100212031100':[-110.786133,38.125915,-110.775146,38.134557],'023100212031101':[-110.775146,38.125915,-110.76416,38.134557],'023100212012322':[-110.874023,38.134557,-110.863037,38.143198],'023100212012323':[-110.863037,38.134557,-110.852051,38.143198],'023100212012332':[-110.852051,38.134557,-110.841064,38.143198],'023100212012333':[-110.841064,38.134557,-110.830078,38.143198],'023100212013222':[-110.830078,38.134557,-110.819092,38.143198],'023100212013223':[-110.819092,38.134557,-110.808105,38.143198],'023100212013232':[-110.808105,38.134557,-110.797119,38.143198],'023100212013233':[-110.797119,38.134557,-110.786133,38.143198],'023100212013322':[-110.786133,38.134557,-110.775146,38.143198],'023100212013323':[-110.775146,38.134557,-110.76416,38.143198],'023100212012320':[-110.874023,38.143198,-110.863037,38.151837],'023100212012321':[-110.863037,38.143198,-110.852051,38.151837],'023100212012330':[-110.852051,38.143198,-110.841064,38.151837],'023100212012331':[-110.841064,38.143198,-110.830078,38.151837],'023100212013220':[-110.830078,38.143198,-110.819092,38.151837],'023100212013221':[-110.819092,38.143198,-110.808105,38.151837],'023100212013230':[-110.808105,38.143198,-110.797119,38.151837],'023100212013231':[-110.797119,38.143198,-110.786133,38.151837],'023100212013320':[-110.786133,38.143198,-110.775146,38.151837],'023100212013321':[-110.775146,38.143198,-110.76416,38.151837],'023100212012302':[-110.874023,38.151837,-110.863037,38.160476],'023100212012303':[-110.863037,38.151837,-110.852051,38.160476],'023100212012312':[-110.852051,38.151837,-110.841064,38.160476],'023100212012313':[-110.841064,38.151837,-110.830078,38.160476],'023100212013202':[-110.830078,38.151837,-110.819092,38.160476],'023100212013203':[-110.819092,38.151837,-110.808105,38.160476],'023100212013212':[-110.808105,38.151837,-110.797119,38.160476],'023100212013213':[-110.797119,38.151837,-110.786133,38.160476],'023100212013302':[-110.786133,38.151837,-110.775146,38.160476],'023100212013303':[-110.775146,38.151837,-110.76416,38.160476]};
//let zoom=20;let data={'02310021203100320331':[-110.816689,38.119703,-110.816345,38.119973],'02310021203100321220':[-110.816345,38.119703,-110.816002,38.119973],'02310021203100321221':[-110.816002,38.119703,-110.815659,38.119973],'02310021203100321230':[-110.815659,38.119703,-110.815315,38.119973],'02310021203100321231':[-110.815315,38.119703,-110.814972,38.119973],'02310021203100321320':[-110.814972,38.119703,-110.814629,38.119973],'02310021203100321321':[-110.814629,38.119703,-110.814285,38.119973],'02310021203100321330':[-110.814285,38.119703,-110.813942,38.119973],'02310021203100321331':[-110.813942,38.119703,-110.813599,38.119973],'02310021203100330220':[-110.813599,38.119703,-110.813255,38.119973],'02310021203100330221':[-110.813255,38.119703,-110.812912,38.119973],'02310021203100320313':[-110.816689,38.119973,-110.816345,38.120243],'02310021203100321202':[-110.816345,38.119973,-110.816002,38.120243],'02310021203100321203':[-110.816002,38.119973,-110.815659,38.120243],'02310021203100321212':[-110.815659,38.119973,-110.815315,38.120243],'02310021203100321213':[-110.815315,38.119973,-110.814972,38.120243],'02310021203100321302':[-110.814972,38.119973,-110.814629,38.120243],'02310021203100321303':[-110.814629,38.119973,-110.814285,38.120243],'02310021203100321312':[-110.814285,38.119973,-110.813942,38.120243],'02310021203100321313':[-110.813942,38.119973,-110.813599,38.120243],'02310021203100330202':[-110.813599,38.119973,-110.813255,38.120243],'02310021203100330203':[-110.813255,38.119973,-110.812912,38.120243],'02310021203100320311':[-110.816689,38.120243,-110.816345,38.120513],'02310021203100321200':[-110.816345,38.120243,-110.816002,38.120513],'02310021203100321201':[-110.816002,38.120243,-110.815659,38.120513],'02310021203100321210':[-110.815659,38.120243,-110.815315,38.120513],'02310021203100321211':[-110.815315,38.120243,-110.814972,38.120513],'02310021203100321300':[-110.814972,38.120243,-110.814629,38.120513],'02310021203100321301':[-110.814629,38.120243,-110.814285,38.120513],'02310021203100321310':[-110.814285,38.120243,-110.813942,38.120513],'02310021203100321311':[-110.813942,38.120243,-110.813599,38.120513],'02310021203100330200':[-110.813599,38.120243,-110.813255,38.120513],'02310021203100330201':[-110.813255,38.120243,-110.812912,38.120513],'02310021203100320133':[-110.816689,38.120513,-110.816345,38.120783],'02310021203100321022':[-110.816345,38.120513,-110.816002,38.120783],'02310021203100321023':[-110.816002,38.120513,-110.815659,38.120783],'02310021203100321032':[-110.815659,38.120513,-110.815315,38.120783],'02310021203100321033':[-110.815315,38.120513,-110.814972,38.120783],'02310021203100321122':[-110.814972,38.120513,-110.814629,38.120783],'02310021203100321123':[-110.814629,38.120513,-110.814285,38.120783],'02310021203100321132':[-110.814285,38.120513,-110.813942,38.120783],'02310021203100321133':[-110.813942,38.120513,-110.813599,38.120783],'02310021203100330022':[-110.813599,38.120513,-110.813255,38.120783],'02310021203100330023':[-110.813255,38.120513,-110.812912,38.120783],'02310021203100320131':[-110.816689,38.120783,-110.816345,38.121053],'02310021203100321020':[-110.816345,38.120783,-110.816002,38.121053],'02310021203100321021':[-110.816002,38.120783,-110.815659,38.121053],'02310021203100321030':[-110.815659,38.120783,-110.815315,38.121053],'02310021203100321031':[-110.815315,38.120783,-110.814972,38.121053],'02310021203100321120':[-110.814972,38.120783,-110.814629,38.121053],'02310021203100321121':[-110.814629,38.120783,-110.814285,38.121053],'02310021203100321130':[-110.814285,38.120783,-110.813942,38.121053],'02310021203100321131':[-110.813942,38.120783,-110.813599,38.121053],'02310021203100330020':[-110.813599,38.120783,-110.813255,38.121053],'02310021203100330021':[-110.813255,38.120783,-110.812912,38.121053],'02310021203100320113':[-110.816689,38.121053,-110.816345,38.121323],'02310021203100321002':[-110.816345,38.121053,-110.816002,38.121323],'02310021203100321003':[-110.816002,38.121053,-110.815659,38.121323],'02310021203100321012':[-110.815659,38.121053,-110.815315,38.121323],'02310021203100321013':[-110.815315,38.121053,-110.814972,38.121323],'02310021203100321102':[-110.814972,38.121053,-110.814629,38.121323],'02310021203100321103':[-110.814629,38.121053,-110.814285,38.121323],'02310021203100321112':[-110.814285,38.121053,-110.813942,38.121323],'02310021203100321113':[-110.813942,38.121053,-110.813599,38.121323],'02310021203100330002':[-110.813599,38.121053,-110.813255,38.121323],'02310021203100330003':[-110.813255,38.121053,-110.812912,38.121323],'02310021203100320111':[-110.816689,38.121323,-110.816345,38.121593],'02310021203100321000':[-110.816345,38.121323,-110.816002,38.121593],'02310021203100321001':[-110.816002,38.121323,-110.815659,38.121593],'02310021203100321010':[-110.815659,38.121323,-110.815315,38.121593],'02310021203100321011':[-110.815315,38.121323,-110.814972,38.121593],'02310021203100321100':[-110.814972,38.121323,-110.814629,38.121593],'02310021203100321101':[-110.814629,38.121323,-110.814285,38.121593],'02310021203100321110':[-110.814285,38.121323,-110.813942,38.121593],'02310021203100321111':[-110.813942,38.121323,-110.813599,38.121593],'02310021203100330000':[-110.813599,38.121323,-110.813255,38.121593],'02310021203100330001':[-110.813255,38.121323,-110.812912,38.121593],'02310021203100302333':[-110.816689,38.121593,-110.816345,38.121863],'02310021203100303222':[-110.816345,38.121593,-110.816002,38.121863],'02310021203100303223':[-110.816002,38.121593,-110.815659,38.121863],'02310021203100303232':[-110.815659,38.121593,-110.815315,38.121863],'02310021203100303233':[-110.815315,38.121593,-110.814972,38.121863],'02310021203100303322':[-110.814972,38.121593,-110.814629,38.121863],'02310021203100303323':[-110.814629,38.121593,-110.814285,38.121863],'02310021203100303332':[-110.814285,38.121593,-110.813942,38.121863],'02310021203100303333':[-110.813942,38.121593,-110.813599,38.121863],'02310021203100312222':[-110.813599,38.121593,-110.813255,38.121863],'02310021203100312223':[-110.813255,38.121593,-110.812912,38.121863],'02310021203100302331':[-110.816689,38.121863,-110.816345,38.122133],'02310021203100303220':[-110.816345,38.121863,-110.816002,38.122133],'02310021203100303221':[-110.816002,38.121863,-110.815659,38.122133],'02310021203100303230':[-110.815659,38.121863,-110.815315,38.122133],'02310021203100303231':[-110.815315,38.121863,-110.814972,38.122133],'02310021203100303320':[-110.814972,38.121863,-110.814629,38.122133],'02310021203100303321':[-110.814629,38.121863,-110.814285,38.122133],'02310021203100303330':[-110.814285,38.121863,-110.813942,38.122133],'02310021203100303331':[-110.813942,38.121863,-110.813599,38.122133],'02310021203100312220':[-110.813599,38.121863,-110.813255,38.122133],'02310021203100312221':[-110.813255,38.121863,-110.812912,38.122133],'02310021203100302313':[-110.816689,38.122133,-110.816345,38.122404],'02310021203100303202':[-110.816345,38.122133,-110.816002,38.122404],'02310021203100303203':[-110.816002,38.122133,-110.815659,38.122404],'02310021203100303212':[-110.815659,38.122133,-110.815315,38.122404],'02310021203100303213':[-110.815315,38.122133,-110.814972,38.122404],'02310021203100303302':[-110.814972,38.122133,-110.814629,38.122404],'02310021203100303303':[-110.814629,38.122133,-110.814285,38.122404],'02310021203100303312':[-110.814285,38.122133,-110.813942,38.122404],'02310021203100303313':[-110.813942,38.122133,-110.813599,38.122404],'02310021203100312202':[-110.813599,38.122133,-110.813255,38.122404],'02310021203100312203':[-110.813255,38.122133,-110.812912,38.122404]};
let zoom=18;let data={'023100212031020112':[-110.821838,38.115111,-110.820465,38.116191],'023100212031020113':[-110.820465,38.115111,-110.819092,38.116191],'023100212031021002':[-110.819092,38.115111,-110.817719,38.116191],'023100212031021003':[-110.817719,38.115111,-110.816345,38.116191],'023100212031021012':[-110.816345,38.115111,-110.814972,38.116191],'023100212031021013':[-110.814972,38.115111,-110.813599,38.116191],'023100212031021102':[-110.813599,38.115111,-110.812225,38.116191],'023100212031021103':[-110.812225,38.115111,-110.810852,38.116191],'023100212031021112':[-110.810852,38.115111,-110.809479,38.116191],'023100212031021113':[-110.809479,38.115111,-110.808105,38.116191],'023100212031030002':[-110.808105,38.115111,-110.806732,38.116191],'023100212031020110':[-110.821838,38.116191,-110.820465,38.117272],'023100212031020111':[-110.820465,38.116191,-110.819092,38.117272],'023100212031021000':[-110.819092,38.116191,-110.817719,38.117272],'023100212031021001':[-110.817719,38.116191,-110.816345,38.117272],'023100212031021010':[-110.816345,38.116191,-110.814972,38.117272],'023100212031021011':[-110.814972,38.116191,-110.813599,38.117272],'023100212031021100':[-110.813599,38.116191,-110.812225,38.117272],'023100212031021101':[-110.812225,38.116191,-110.810852,38.117272],'023100212031021110':[-110.810852,38.116191,-110.809479,38.117272],'023100212031021111':[-110.809479,38.116191,-110.808105,38.117272],'023100212031030000':[-110.808105,38.116191,-110.806732,38.117272],'023100212031002332':[-110.821838,38.117272,-110.820465,38.118352],'023100212031002333':[-110.820465,38.117272,-110.819092,38.118352],'023100212031003222':[-110.819092,38.117272,-110.817719,38.118352],'023100212031003223':[-110.817719,38.117272,-110.816345,38.118352],'023100212031003232':[-110.816345,38.117272,-110.814972,38.118352],'023100212031003233':[-110.814972,38.117272,-110.813599,38.118352],'023100212031003322':[-110.813599,38.117272,-110.812225,38.118352],'023100212031003323':[-110.812225,38.117272,-110.810852,38.118352],'023100212031003332':[-110.810852,38.117272,-110.809479,38.118352],'023100212031003333':[-110.809479,38.117272,-110.808105,38.118352],'023100212031012222':[-110.808105,38.117272,-110.806732,38.118352],'023100212031002330':[-110.821838,38.118352,-110.820465,38.119432],'023100212031002331':[-110.820465,38.118352,-110.819092,38.119432],'023100212031003220':[-110.819092,38.118352,-110.817719,38.119432],'023100212031003221':[-110.817719,38.118352,-110.816345,38.119432],'023100212031003230':[-110.816345,38.118352,-110.814972,38.119432],'023100212031003231':[-110.814972,38.118352,-110.813599,38.119432],'023100212031003320':[-110.813599,38.118352,-110.812225,38.119432],'023100212031003321':[-110.812225,38.118352,-110.810852,38.119432],'023100212031003330':[-110.810852,38.118352,-110.809479,38.119432],'023100212031003331':[-110.809479,38.118352,-110.808105,38.119432],'023100212031012220':[-110.808105,38.118352,-110.806732,38.119432],'023100212031002312':[-110.821838,38.119432,-110.820465,38.120513],'023100212031002313':[-110.820465,38.119432,-110.819092,38.120513],'023100212031003202':[-110.819092,38.119432,-110.817719,38.120513],'023100212031003203':[-110.817719,38.119432,-110.816345,38.120513],'023100212031003212':[-110.816345,38.119432,-110.814972,38.120513],'023100212031003213':[-110.814972,38.119432,-110.813599,38.120513],'023100212031003302':[-110.813599,38.119432,-110.812225,38.120513],'023100212031003303':[-110.812225,38.119432,-110.810852,38.120513],'023100212031003312':[-110.810852,38.119432,-110.809479,38.120513],'023100212031003313':[-110.809479,38.119432,-110.808105,38.120513],'023100212031012202':[-110.808105,38.119432,-110.806732,38.120513],'023100212031002310':[-110.821838,38.120513,-110.820465,38.121593],'023100212031002311':[-110.820465,38.120513,-110.819092,38.121593],'023100212031003200':[-110.819092,38.120513,-110.817719,38.121593],'023100212031003201':[-110.817719,38.120513,-110.816345,38.121593],'023100212031003210':[-110.816345,38.120513,-110.814972,38.121593],'023100212031003211':[-110.814972,38.120513,-110.813599,38.121593],'023100212031003300':[-110.813599,38.120513,-110.812225,38.121593],'023100212031003301':[-110.812225,38.120513,-110.810852,38.121593],'023100212031003310':[-110.810852,38.120513,-110.809479,38.121593],'023100212031003311':[-110.809479,38.120513,-110.808105,38.121593],'023100212031012200':[-110.808105,38.120513,-110.806732,38.121593],'023100212031002132':[-110.821838,38.121593,-110.820465,38.122674],'023100212031002133':[-110.820465,38.121593,-110.819092,38.122674],'023100212031003022':[-110.819092,38.121593,-110.817719,38.122674],'023100212031003023':[-110.817719,38.121593,-110.816345,38.122674],'023100212031003032':[-110.816345,38.121593,-110.814972,38.122674],'023100212031003033':[-110.814972,38.121593,-110.813599,38.122674],'023100212031003122':[-110.813599,38.121593,-110.812225,38.122674],'023100212031003123':[-110.812225,38.121593,-110.810852,38.122674],'023100212031003132':[-110.810852,38.121593,-110.809479,38.122674],'023100212031003133':[-110.809479,38.121593,-110.808105,38.122674],'023100212031012022':[-110.808105,38.121593,-110.806732,38.122674],'023100212031002130':[-110.821838,38.122674,-110.820465,38.123754],'023100212031002131':[-110.820465,38.122674,-110.819092,38.123754],'023100212031003020':[-110.819092,38.122674,-110.817719,38.123754],'023100212031003021':[-110.817719,38.122674,-110.816345,38.123754],'023100212031003030':[-110.816345,38.122674,-110.814972,38.123754],'023100212031003031':[-110.814972,38.122674,-110.813599,38.123754],'023100212031003120':[-110.813599,38.122674,-110.812225,38.123754],'023100212031003121':[-110.812225,38.122674,-110.810852,38.123754],'023100212031003130':[-110.810852,38.122674,-110.809479,38.123754],'023100212031003131':[-110.809479,38.122674,-110.808105,38.123754],'023100212031012020':[-110.808105,38.122674,-110.806732,38.123754],'023100212031002112':[-110.821838,38.123754,-110.820465,38.124834],'023100212031002113':[-110.820465,38.123754,-110.819092,38.124834],'023100212031003002':[-110.819092,38.123754,-110.817719,38.124834],'023100212031003003':[-110.817719,38.123754,-110.816345,38.124834],'023100212031003012':[-110.816345,38.123754,-110.814972,38.124834],'023100212031003013':[-110.814972,38.123754,-110.813599,38.124834],'023100212031003102':[-110.813599,38.123754,-110.812225,38.124834],'023100212031003103':[-110.812225,38.123754,-110.810852,38.124834],'023100212031003112':[-110.810852,38.123754,-110.809479,38.124834],'023100212031003113':[-110.809479,38.123754,-110.808105,38.124834],'023100212031012002':[-110.808105,38.123754,-110.806732,38.124834],'023100212031002110':[-110.821838,38.124834,-110.820465,38.125915],'023100212031002111':[-110.820465,38.124834,-110.819092,38.125915],'023100212031003000':[-110.819092,38.124834,-110.817719,38.125915],'023100212031003001':[-110.817719,38.124834,-110.816345,38.125915],'023100212031003010':[-110.816345,38.124834,-110.814972,38.125915],'023100212031003011':[-110.814972,38.124834,-110.813599,38.125915],'023100212031003100':[-110.813599,38.124834,-110.812225,38.125915],'023100212031003101':[-110.812225,38.124834,-110.810852,38.125915],'023100212031003110':[-110.810852,38.124834,-110.809479,38.125915],'023100212031003111':[-110.809479,38.124834,-110.808105,38.125915],'023100212031012000':[-110.808105,38.124834,-110.806732,38.125915],'023100212031000332':[-110.821838,38.125915,-110.820465,38.126995],'023100212031000333':[-110.820465,38.125915,-110.819092,38.126995],'023100212031001222':[-110.819092,38.125915,-110.817719,38.126995],'023100212031001223':[-110.817719,38.125915,-110.816345,38.126995],'023100212031001232':[-110.816345,38.125915,-110.814972,38.126995],'023100212031001233':[-110.814972,38.125915,-110.813599,38.126995],'023100212031001322':[-110.813599,38.125915,-110.812225,38.126995],'023100212031001323':[-110.812225,38.125915,-110.810852,38.126995],'023100212031001332':[-110.810852,38.125915,-110.809479,38.126995],'023100212031001333':[-110.809479,38.125915,-110.808105,38.126995],'023100212031010222':[-110.808105,38.125915,-110.806732,38.126995]};

let out = Fs.createWriteStream(`./${type}$${zoom}.kml`, 'utf-8')

out.write(`<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
<Document>
	<name>${type.split('-')[0]}/${zoom}</name>
	<open>1</open>
`)




Object.keys(data).forEach(key => {

	out.write(`\t<GroundOverlay>
		<name>${key}</name>
		<visibility>0</visibility>
		<drawOrder>50</drawOrder>
		<Icon>
			<href>D:/Maps/db/tiles/${type}/${key}.jpg</href>
			<viewBoundScale>0.75</viewBoundScale>
		</Icon>
		<LatLonBox>
			<north>${data[key][3]}</north>
			<south>${data[key][1]}</south>
			<east>${data[key][2]}</east>
			<west>${data[key][0]}</west>
		</LatLonBox>
	</GroundOverlay>
`)

})

out.write(`</Document>
</kml>
`)
