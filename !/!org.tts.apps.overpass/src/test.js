let _ = require('org.tts.js.lodash')

let Overpass = require('./Overpass')

overpass = new Overpass()

//overpass.Query('capabilities', log)
//overpass.Node('3229765488', log)


let data = JSON.parse("{\"node\":[\"3229765488\",\"3297770131\",\"3298416012\",\"3298416073\",\"3298416092\",\"3298416978\",\"3298416993\",\"3298417023\",\"3298417029\",\"3298500696\",\"3298935339\",\"3298939369\",\"3298939421\",\"3299494606\",\"3300539381\",\"3300542817\",\"3300543174\",\"3300543864\",\"3300544804\",\"3303393836\",\"3303393839\",\"3303393840\",\"3303394097\",\"3303394219\",\"3303394625\",\"3303852539\",\"3304968614\",\"3304968615\",\"3304969373\",\"3306737183\",\"3306737301\",\"3311027747\",\"3381360291\",\"3383414849\",\"3384532854\",\"3386170185\",\"3386170187\",\"3386171540\",\"3387772284\",\"3387774059\",\"3387774154\",\"3387774167\",\"3389671678\",\"3391697925\",\"3391699729\",\"3391769085\",\"3391769086\",\"3391770930\",\"3394683070\",\"3400918680\",\"3400918681\",\"3400918686\",\"3400918689\",\"3400918690\",\"3400921931\",\"3400922755\",\"3402804063\",\"3402804064\",\"3402805179\",\"3402862697\",\"3403944673\",\"3403945545\",\"3403962627\",\"3404046151\",\"3404046152\",\"3404046979\",\"3404047215\",\"3404167947\",\"3404168558\",\"3425239787\",\"3425239788\",\"3425239791\",\"3425239792\",\"3425272097\",\"3425272109\",\"83110801\",\"83113317\",\"83113426\",\"83137737\",\"356671992\",\"356672201\",\"356672437\",\"356672553\",\"356672604\",\"356672615\",\"356672649\",\"356673353\",\"356673914\",\"356674445\",\"356674506\",\"356674530\",\"356674630\",\"356675472\",\"3202148695\",\"3229765487\",\"3229765488\",\"3297726503\",\"3297726505\",\"3297726506\",\"3297726507\",\"3297726510\",\"3297726527\",\"3297726527\",\"3297726539\",\"3297726539\",\"3297726543\",\"3297726543\",\"3299494602\",\"3299494603\",\"3299494604\",\"3299494606\",\"3300542817\",\"3300542817\",\"3303393836\",\"3303393837\",\"3303393839\",\"3303393840\",\"3303394097\",\"3303394097\",\"3303394219\",\"3303394219\",\"3303852539\",\"3303852539\",\"3304968614\",\"3304968615\",\"3304968616\",\"3304969373\",\"3304969373\",\"3306737166\",\"3306737167\",\"3306737168\",\"3306737170\",\"3306737183\",\"3306737183\",\"3306737301\",\"3306737301\",\"3385412269\",\"3386170185\",\"3386170186\",\"3386170187\",\"3386170188\",\"3386171540\",\"3386171540\",\"3394683070\",\"3400918680\",\"3400918681\",\"3400918682\",\"3400918684\",\"3400918685\",\"3400918687\",\"3400918688\",\"3400918691\",\"3400918692\",\"3400922755\",\"3400922755\",\"3402804061\",\"3402804064\",\"3402805179\",\"3402805179\",\"3403942505\",\"3404046151\",\"3404046152\",\"3404046169\",\"3404046169\",\"3404046954\",\"3404046954\",\"3404046979\",\"3404046979\",\"3404047215\",\"3404047215\",\"3404167947\",\"3404167948\",\"3404167949\",\"3404168274\",\"3404168274\",\"3404168558\",\"3404168558\",\"3425239783\",\"3425239784\",\"3425239785\",\"3425239786\",\"3425239787\",\"3425239788\",\"3425239789\",\"3425239790\",\"6224297079\",\"6224297079\",\"6224383950\",\"8303340546\",\"3303393836\",\"3303393839\",\"3303393840\",\"3303394219\",\"3303394219\",\"83110801\",\"83113317\",\"83113426\",\"1592193496\",\"3211499796\",\"3229768716\",\"3297726527\",\"3297726539\",\"3298935339\",\"3300542817\",\"3300544804\",\"3303393836\",\"3303393839\",\"3303393840\",\"3303394097\",\"3303394219\",\"3303396090\",\"3304458772\",\"3304968614\",\"3304968615\",\"3304969373\",\"3306737183\",\"3306738791\",\"3400922755\",\"3404168558\",\"3229765488\",\"3303393836\",\"3303393839\",\"3303393840\",\"3303394097\",\"3303394219\",\"3303394625\",\"3303852539\",\"3304968615\",\"3304969373\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"83141222\",\"84376112\",\"355849422\",\"3306739329\",\"3306739622\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\",\"3304969373\",\"3304968614\",\"3303394625\",\"3229765488\",\"3303852539\",\"3303393840\",\"3303394219\",\"3303394097\",\"3303393839\",\"3303393836\",\"3304968615\"],\"way\":[\"10203299\",\"10203307\",\"147289892\",\"147289894\",\"147290955\",\"315061561\",\"315061563\",\"323155724\",\"323155728\",\"323155730\",\"323155732\",\"323155733\",\"323155734\",\"323553671\",\"323553673\",\"323553678\",\"323603591\",\"323603592\",\"323603596\",\"323603597\",\"323603598\",\"323603599\",\"323724733\",\"323900531\",\"323900579\",\"323900585\",\"323900586\",\"323900590\",\"10100556\",\"10100558\",\"10100581\",\"10100780\",\"10100840\",\"10100914\",\"10101143\",\"10101226\",\"10101440\",\"10101613\",\"10101780\",\"10101919\",\"10101922\",\"10102123\",\"10102678\",\"10102686\",\"10102741\",\"10102865\",\"10102887\",\"10102889\",\"10102951\",\"10102980\",\"10103068\",\"10103073\",\"10103087\",\"10103091\",\"10103094\",\"10103138\",\"10103194\",\"10103315\",\"10103973\",\"10103983\",\"10104097\",\"10104185\",\"10104396\",\"10104430\",\"10104673\",\"10104736\",\"10104805\",\"10104813\",\"10104885\",\"10104889\",\"10104919\",\"10104939\",\"10105018\",\"10105133\",\"10105219\",\"10105231\",\"10201977\",\"131408519\",\"131409353\",\"131409355\",\"131414153\",\"131414156\",\"131414157\",\"131414691\",\"131414692\",\"131414694\",\"131414695\",\"131414696\",\"131415222\",\"131415230\",\"131415233\",\"131416839\",\"131416845\",\"131416847\",\"131416848\",\"131416849\",\"131416851\",\"131416852\",\"131416853\",\"131416854\",\"131416855\",\"131416857\",\"131417603\",\"131422148\",\"131422149\",\"131422150\",\"131422151\",\"131468340\",\"131468342\",\"131468785\",\"131469543\",\"144589959\",\"144589964\",\"144599498\",\"144615125\",\"144615133\",\"144615136\",\"144718015\",\"144720393\",\"144720399\",\"144720404\",\"144720408\",\"144720409\",\"144720412\",\"144720416\",\"144720417\",\"144720420\",\"144720431\",\"144720450\",\"144720452\",\"144720455\",\"144720458\",\"144720461\",\"144723073\",\"144723097\",\"144723098\",\"144733023\",\"144733031\",\"144738662\",\"144738670\",\"144738674\",\"144738692\",\"144752043\",\"144752052\",\"144752074\",\"144752112\",\"144752123\",\"144752142\",\"144752172\",\"144788609\",\"144788611\",\"144788613\",\"144791849\",\"144815942\",\"144815946\",\"144815947\",\"144870684\",\"144870685\",\"145122252\",\"145122253\",\"145122254\",\"145122255\",\"145122256\",\"145122257\",\"145122620\",\"145224538\",\"145224565\",\"145224566\",\"145224567\",\"145224568\",\"145224569\",\"145225083\",\"145225084\",\"145225086\",\"145225087\",\"145225102\",\"145225305\",\"145225356\",\"145422099\",\"145423398\",\"145423548\",\"145424389\",\"145424390\",\"145424391\",\"145424392\",\"145424393\",\"145424639\",\"145424640\",\"145427433\",\"145427443\",\"145427463\",\"145427464\",\"145427466\",\"145427467\",\"145427468\",\"145427469\",\"145428407\",\"145428410\",\"145428411\",\"145428412\",\"145428430\",\"145428442\",\"145428449\",\"145433798\",\"145433807\",\"145433808\",\"145433809\",\"145436358\",\"145436361\",\"145436372\",\"145438507\",\"145438516\",\"145438519\",\"145438525\",\"145561548\",\"145562467\",\"145562477\",\"145593825\",\"145593835\",\"145594176\",\"145729735\",\"145729739\",\"145729785\",\"145732219\",\"145738088\",\"145754165\",\"145892990\",\"145892991\",\"145893148\",\"145893587\",\"145894324\",\"145894325\",\"145894327\",\"145894328\",\"145894329\",\"145894467\",\"145894468\",\"145894469\",\"145895036\",\"145895037\",\"145895038\",\"145895039\",\"145895040\",\"145895041\",\"145895611\",\"145895612\",\"145895613\",\"145895614\",\"145907987\",\"145908041\",\"145913811\",\"145913814\",\"145913815\",\"145913818\",\"145913820\",\"145913824\",\"145913826\",\"145928477\",\"145928490\",\"145928525\",\"145930781\",\"146003116\",\"146003135\",\"146003299\",\"146003320\",\"146008449\",\"146008454\",\"146014576\",\"146039971\",\"146159823\",\"146159825\",\"146159826\",\"146159827\",\"146159832\",\"146160488\",\"146160489\",\"146160491\",\"146160496\",\"146160497\",\"146160866\",\"146161132\",\"146161133\",\"146161135\",\"146161136\",\"146162277\",\"146162307\",\"146163966\",\"146163980\",\"146163991\",\"146165486\",\"146165491\",\"146165744\",\"146165748\",\"146190635\",\"146192773\",\"146192779\",\"146192788\",\"146192793\",\"146192815\",\"146338413\",\"146338414\",\"146338415\",\"146338416\",\"146343665\",\"146343668\",\"146343670\",\"146343671\",\"146343672\",\"146343674\",\"146360317\",\"146360334\",\"146361314\",\"146361321\",\"146466417\",\"146466419\",\"146466429\",\"146466432\",\"146466433\",\"146466434\",\"146466435\",\"146467090\",\"146467094\",\"146467099\",\"146467101\",\"146467118\",\"146467129\",\"146467139\",\"146467141\",\"146467149\",\"146467154\",\"146467161\",\"146467162\",\"146467166\",\"146472674\",\"147035902\",\"147035905\",\"147039516\",\"147040448\",\"147109029\",\"147109030\",\"147109031\",\"147109033\",\"147109040\",\"147109041\",\"147109042\",\"147109043\",\"147110303\",\"147110304\",\"147110307\",\"147110308\",\"147110309\",\"147110311\",\"147110312\",\"147110504\",\"147110505\",\"147111147\",\"147111148\",\"147111149\",\"147111150\",\"147126983\",\"147126985\",\"147126991\",\"147126993\",\"147126994\",\"147128941\",\"147128981\",\"147128993\",\"147142957\",\"147144659\",\"147145321\",\"147145322\",\"147145328\",\"147145331\",\"147145332\",\"147145850\",\"147146314\",\"147146315\",\"147229390\",\"147229391\",\"147229659\",\"147229660\",\"147235365\",\"147235373\",\"147235418\",\"147235435\",\"147240232\",\"147240240\",\"147241842\",\"147241884\",\"147241887\",\"147241897\",\"147241921\",\"147241924\",\"147241925\",\"147241926\",\"147241927\",\"147241928\",\"147256180\",\"147258801\",\"147258806\",\"147258819\",\"147258823\",\"147258830\",\"147258835\",\"147258838\",\"147258842\",\"147258845\",\"147258848\",\"147258854\",\"147258872\",\"147258878\",\"147260698\",\"147260702\",\"147260703\",\"147260735\",\"147260738\",\"147261284\",\"147261285\",\"147261286\",\"147284857\",\"147284858\",\"147284859\",\"147284860\",\"147284864\",\"147286607\",\"147286651\",\"147286658\",\"147286663\",\"147288508\",\"147288509\",\"147288510\",\"147288515\",\"147289887\",\"147289888\",\"147289889\",\"147289891\",\"147289893\",\"147290950\",\"147290951\",\"147290952\",\"147290953\",\"147290954\",\"147290956\",\"147290957\",\"147290966\",\"147291134\",\"147291135\",\"147389516\",\"147389518\",\"148037024\",\"148042126\",\"148042128\",\"148042133\",\"148299023\",\"148299024\",\"148300687\",\"148300694\",\"148300704\",\"148309066\",\"148309565\",\"148309574\",\"148310298\",\"148310310\",\"148310311\",\"148310312\",\"148310313\",\"148310314\",\"148310315\",\"148310316\",\"172497166\",\"172529708\",\"303738891\",\"303738892\",\"314167705\",\"314874905\",\"314874907\",\"317009977\",\"322228334\",\"322265430\",\"322265439\",\"322267407\",\"322293630\",\"322369439\",\"322369447\",\"322459887\",\"322459888\",\"322504974\",\"322504975\",\"322504977\",\"322677168\",\"322677170\",\"322971491\",\"322971494\",\"322971495\",\"322971497\",\"322978025\",\"323041821\",\"323041822\",\"323041823\",\"323041824\",\"323099638\",\"323099688\",\"323155719\",\"323155725\",\"323155726\",\"323155727\",\"323155729\",\"323155731\",\"323163273\",\"323447641\",\"324352985\",\"324352986\",\"324352987\",\"324352988\",\"324352989\",\"324352990\",\"324352991\",\"324352992\",\"324352993\",\"324485087\",\"324485088\",\"324485089\",\"324485090\",\"324485091\",\"324561103\",\"331087395\",\"331087397\",\"331087398\",\"331087399\",\"331087400\",\"331087401\",\"331087405\",\"331087410\",\"331087413\",\"331087416\",\"331087418\",\"331087420\",\"331087425\",\"331087427\",\"331087431\",\"331087432\",\"331087434\",\"331313972\",\"331455965\",\"331523604\",\"331523607\",\"331523611\",\"331547006\",\"331547008\",\"331547016\",\"331547023\",\"331547028\",\"331547032\",\"331547033\",\"331547034\",\"331547036\",\"332972366\",\"333170204\",\"333176396\",\"333267658\",\"333267668\",\"333267686\",\"333283615\",\"657044624\",\"657044625\",\"657044627\",\"657044731\",\"657048595\",\"657048596\",\"664981861\",\"664981862\",\"664981863\",\"664981864\",\"664981865\",\"664981866\",\"664981867\",\"664981868\",\"664981869\",\"664986052\",\"664986057\",\"664986058\",\"664986909\",\"664986910\",\"664986913\",\"664988423\",\"687791524\",\"732012790\",\"732012791\",\"732012792\",\"148029147\",\"148090499\",\"323353181\",\"131408998\",\"131408999\",\"131409000\",\"131409001\",\"131416850\",\"131417598\",\"144615089\",\"144718014\",\"144720465\",\"144738702\",\"144790709\",\"144790714\",\"144790715\",\"144790716\",\"145224550\",\"145225085\",\"145421365\",\"145422080\",\"145427470\",\"145427471\",\"145561545\",\"145562450\",\"145562456\",\"145732226\",\"145754172\",\"145894326\",\"145913827\",\"145913829\",\"145913831\",\"145913832\",\"145928492\",\"146003136\",\"146003144\",\"146003151\",\"146008481\",\"146008511\",\"146014564\",\"146040007\",\"146040012\",\"146040026\",\"146040032\",\"146040040\",\"146040049\",\"146041248\",\"146041253\",\"146041259\",\"146041266\",\"146041270\",\"146041274\",\"146041278\",\"146159829\",\"146160864\",\"146160865\",\"146160867\",\"146160868\",\"146160870\",\"146160874\",\"146161134\",\"146162257\",\"146162263\",\"146162264\",\"146162265\",\"146162271\",\"146467124\",\"147035907\",\"147126995\",\"147235391\",\"147241856\",\"147241862\",\"147260700\",\"148300662\",\"322228316\",\"322265423\",\"322265427\",\"322369296\",\"322369297\",\"322369298\",\"322369300\",\"322369303\",\"322369306\",\"322369310\",\"322369313\",\"322369317\",\"322369320\",\"322369324\",\"322369327\",\"322369329\",\"322369330\",\"322369332\",\"322369336\",\"322369340\",\"322369343\",\"322369346\",\"322369350\",\"322369352\",\"322369360\",\"322369364\",\"322369367\",\"322369370\",\"322369373\",\"322369375\",\"322369376\",\"322369377\",\"322369378\",\"322369379\",\"322369380\",\"322369381\",\"322369382\",\"322369383\",\"322369384\",\"322369385\",\"322369386\",\"322369387\",\"322369388\",\"322369389\",\"322369390\",\"322369391\",\"322369392\",\"322369393\",\"322369394\",\"322369395\",\"322369396\",\"322369397\",\"322369398\",\"322369399\",\"322369400\",\"322369401\",\"322369402\",\"322369403\",\"322369404\",\"322369405\",\"322369406\",\"322369407\",\"322369408\",\"322369409\",\"322369410\",\"322369411\",\"322369412\",\"322369413\",\"322369415\",\"322369416\",\"322369417\",\"322369418\",\"322369419\",\"322369420\",\"322369421\",\"322369422\",\"322369423\",\"322369424\",\"322369425\",\"322369426\",\"322369427\",\"322369428\",\"322369429\",\"322369430\",\"322369431\",\"322369432\",\"322369433\",\"322369434\",\"322369435\",\"322369436\",\"322369437\",\"322369438\",\"322459876\",\"322459877\",\"322459878\",\"322459879\",\"322459882\",\"322459883\",\"322504967\",\"322504969\",\"322677144\",\"323041816\",\"323099625\",\"323099626\",\"323099628\",\"323155710\",\"323155711\",\"323163271\",\"324494929\",\"331087365\",\"331087366\",\"331087367\",\"331087368\",\"331087369\",\"331087371\",\"331087372\",\"331087373\",\"331087374\",\"331087378\",\"331087380\",\"331087382\",\"331087383\",\"331087384\",\"331087385\",\"331226421\",\"331262061\",\"331262066\",\"331262067\",\"331262070\",\"331282300\",\"331282301\",\"331282305\",\"331282306\",\"331282307\",\"331282308\",\"331282310\",\"331282313\",\"331282315\",\"331282317\",\"331308690\",\"331313969\",\"331313970\",\"331313971\",\"331675639\",\"331675640\",\"331878685\",\"332218083\",\"333283605\",\"333283606\",\"333283607\",\"333283608\",\"333283609\",\"335413435\",\"323553680\",\"323553683\",\"323553685\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323900599\",\"323900608\",\"323900610\",\"323900612\",\"333513431\",\"333969250\",\"144911354\",\"321213521\",\"322228317\",\"322228324\",\"322249882\",\"322249883\",\"322249885\",\"322249886\",\"322249887\",\"322249888\",\"322249889\",\"322249890\",\"322265442\",\"322265444\",\"322265445\",\"322265446\",\"322265448\",\"322265449\",\"322265450\",\"322265451\",\"322265454\",\"322265456\",\"322265458\",\"322265461\",\"322265462\",\"322293623\",\"322293625\",\"322293626\",\"322369440\",\"322369442\",\"322369444\",\"322369445\",\"322369446\",\"322369448\",\"322459884\",\"322459885\",\"322459886\",\"322459889\",\"322459890\",\"322459891\",\"322459892\",\"322459893\",\"322459894\",\"322504970\",\"322504971\",\"322504973\",\"322504976\",\"322504978\",\"322504979\",\"322504980\",\"322504981\",\"322504982\",\"322576672\",\"322576675\",\"322576686\",\"322576687\",\"322576698\",\"322576699\",\"322576700\",\"322677165\",\"322677172\",\"322677173\",\"322677176\",\"322677178\",\"322677186\",\"322677189\",\"322677191\",\"322677194\",\"323041817\",\"323041819\",\"323041820\",\"323041825\",\"323041826\",\"323041827\",\"323041828\",\"323041829\",\"323041830\",\"323041831\",\"323041832\",\"323041833\",\"323041834\",\"323041835\",\"323048584\",\"323048586\",\"323048587\",\"323099641\",\"323099662\",\"323155720\",\"323155722\",\"323155723\",\"323260178\",\"323260181\",\"323260196\",\"323260199\",\"323260200\",\"323260201\",\"323260203\",\"323260204\",\"323260208\",\"323260213\",\"323260215\",\"323260221\",\"323260223\",\"323260225\",\"323353195\",\"323553679\",\"323553681\",\"323716229\",\"323716238\",\"323900546\",\"324485086\",\"324485092\",\"324485093\",\"324485094\",\"330994930\",\"331153066\",\"331153074\",\"331226434\",\"331282320\",\"331282361\",\"331282363\",\"331282377\",\"331283703\",\"331313973\",\"331675647\",\"331675649\",\"331675654\",\"331878683\",\"331878687\",\"331929588\",\"331929601\",\"332059412\",\"332059415\",\"332059416\",\"332059417\",\"332059421\",\"332059422\",\"332059427\",\"332059439\",\"332059479\",\"332066453\",\"332066456\",\"332066457\",\"332066459\",\"332213099\",\"332352518\",\"332352519\",\"332352520\",\"332972358\",\"332972359\",\"332972360\",\"332972361\",\"332972362\",\"332972363\",\"332972364\",\"333170201\",\"333176393\",\"333176398\",\"333267614\",\"333267641\",\"333267650\",\"333267697\",\"333270919\",\"333270923\",\"333283611\",\"333295297\",\"333295300\",\"335413436\",\"335413437\",\"653336108\",\"664983502\",\"664986053\",\"664986054\",\"664986055\",\"664986056\",\"664986911\",\"664986912\",\"664988417\",\"664988418\",\"664988419\",\"664988420\",\"664988421\",\"664988422\",\"664993815\",\"664993816\",\"664993817\",\"664993818\",\"147964953\",\"323553679\",\"323553681\",\"323553683\",\"323716229\",\"323716246\",\"323716239\",\"323716240\",\"323716238\",\"335413437\",\"323900546\",\"323260178\",\"323260181\",\"323155720\",\"323048587\",\"332972363\",\"331929588\",\"333295297\",\"664986911\",\"333270919\",\"333270923\",\"664988421\",\"333170201\",\"664988420\",\"321213521\",\"323553678\",\"323553667\",\"323553674\",\"323553666\",\"323553673\",\"323553672\",\"323603592\",\"323559736\",\"323603599\",\"323603598\",\"323553671\",\"323672270\",\"323603597\",\"323603591\",\"147256180\",\"147258801\",\"10101922\",\"322971494\",\"324561103\",\"10101613\",\"147229659\",\"147229660\",\"147229390\",\"147145850\",\"314874907\",\"664981866\",\"664981867\",\"664981868\",\"664981869\",\"10101780\",\"323724733\",\"323553678\",\"323553673\",\"323724733\",\"323603592\",\"315061563\",\"323603599\",\"323603598\",\"323603597\",\"323553678\",\"323553673\",\"323603596\",\"323553671\",\"323553672\",\"323553674\",\"323559736\",\"323553667\",\"323553670\",\"323724733\",\"315061561\",\"323603592\",\"315061563\",\"323603599\",\"323603598\",\"323603597\",\"323553678\",\"323553673\",\"323603596\",\"323553671\",\"323553672\",\"323553674\",\"323559736\",\"323553667\",\"323553670\",\"315061562\",\"323724733\",\"315061561\",\"316796763\",\"323900587\",\"323900590\",\"323900586\",\"314874905\",\"322971494\",\"147229390\",\"323155731\",\"147229659\",\"147229660\",\"147145850\",\"147035905\",\"147145328\",\"147145331\",\"147145332\",\"147235373\",\"148042126\",\"10104285\",\"314874907\",\"664981866\",\"664981865\",\"664981867\",\"664981868\",\"664981869\",\"147146315\",\"10101613\",\"323155725\",\"324561103\",\"147256180\",\"147258801\",\"10101922\",\"147258806\",\"147258854\",\"147258830\",\"147258838\",\"322971487\",\"322971489\",\"147258842\",\"147258872\",\"147290953\",\"147290951\",\"323155719\",\"147290957\",\"10104396\",\"147288509\",\"657044627\",\"322971491\",\"331547008\",\"147964953\",\"323716229\",\"323716246\",\"323716241\",\"323716240\",\"323716237\",\"323716239\",\"323716238\",\"335413437\",\"323553678\",\"323553685\",\"323553681\",\"323553683\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323553678\",\"315061563\",\"314874905\",\"322971494\",\"322971494\",\"10101613\",\"314874907\",\"322971494\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"659568086\",\"32081165\",\"49705707\",\"316796763\",\"323553678\",\"315061563\",\"314874905\",\"322971494\",\"322971494\",\"10101613\",\"314874907\",\"322971494\",\"145895038\",\"10103315\",\"322971497\",\"145907987\",\"322971491\",\"314874907\",\"10101780\",\"331547008\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"315061563\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"323603591\",\"315061563\",\"323603597\",\"323603592\",\"323603598\",\"323603599\",\"323724733\",\"323553673\",\"323553678\",\"323553671\",\"323553680\",\"323716237\",\"323716239\",\"323716240\",\"323716241\",\"323716246\",\"323553685\",\"323553683\",\"323553681\",\"323553679\",\"323716229\",\"323716238\",\"10203299\",\"10203307\",\"147289892\",\"147289894\",\"147290955\",\"315061561\",\"315061563\",\"323155724\",\"323155728\",\"323155730\",\"323155732\",\"323155733\",\"323155734\",\"323553671\",\"323553673\",\"323553678\",\"323603591\",\"323603592\",\"323603596\",\"323603597\",\"323603598\",\"323603599\",\"323724733\",\"323900531\",\"323900579\",\"323900585\",\"323900586\",\"323900590\",\"10100556\",\"10100558\",\"10100581\",\"10100780\",\"10100840\",\"10100914\",\"10101143\",\"10101226\",\"10101440\",\"10101613\",\"10101780\",\"10101919\",\"10101922\",\"10102123\",\"10102678\",\"10102686\",\"10102741\",\"10102865\",\"10102887\",\"10102889\",\"10102951\",\"10102980\",\"10103068\",\"10103073\",\"10103087\",\"10103091\",\"10103094\",\"10103138\",\"10103194\",\"10103315\",\"10103973\",\"10103983\",\"10104097\",\"10104185\",\"10104396\",\"10104430\",\"10104673\",\"10104736\",\"10104805\",\"10104813\",\"10104885\",\"10104889\",\"10104919\",\"10104939\",\"10105018\",\"10105133\",\"10105219\",\"10105231\",\"10201977\",\"131408519\",\"131409353\",\"131409355\",\"131414153\",\"131414156\",\"131414157\",\"131414691\",\"131414692\",\"131414694\",\"131414695\",\"131414696\",\"131415222\",\"131415230\",\"131415233\",\"131416839\",\"131416845\",\"131416847\",\"131416848\",\"131416849\",\"131416851\",\"131416852\",\"131416853\",\"131416854\",\"131416855\",\"131416857\",\"131417603\",\"131422148\",\"131422149\",\"131422150\",\"131422151\",\"131468340\",\"131468342\",\"131468785\",\"131469543\",\"144589959\",\"144589964\",\"144599498\",\"144615125\",\"144615133\",\"144615136\",\"144718015\",\"144720393\",\"144720399\",\"144720404\",\"144720408\",\"144720409\",\"144720412\",\"144720416\",\"144720417\",\"144720420\",\"144720431\",\"144720450\",\"144720452\",\"144720455\",\"144720458\",\"144720461\",\"144723073\",\"144723097\",\"144723098\",\"144733023\",\"144733031\",\"144738662\",\"144738670\",\"144738674\",\"144738692\",\"144752043\",\"144752052\",\"144752074\",\"144752112\",\"144752123\",\"144752142\",\"144752172\",\"144788609\",\"144788611\",\"144788613\",\"144791849\",\"144815942\",\"144815946\",\"144815947\",\"144870684\",\"144870685\",\"145122252\",\"145122253\",\"145122254\",\"145122255\",\"145122256\",\"145122257\",\"145122620\",\"145224538\",\"145224565\",\"145224566\",\"145224567\",\"145224568\",\"145224569\",\"145225083\",\"145225084\",\"145225086\",\"145225087\",\"145225102\",\"145225305\",\"145225356\",\"145422099\",\"145423398\",\"145423548\",\"145424389\",\"145424390\",\"145424391\",\"145424392\",\"145424393\",\"145424639\",\"145424640\",\"145427433\",\"145427443\",\"145427463\",\"145427464\",\"145427466\",\"145427467\",\"145427468\",\"145427469\",\"145428407\",\"145428410\",\"145428411\",\"145428412\",\"145428430\",\"145428442\",\"145428449\",\"145433798\",\"145433807\",\"145433808\",\"145433809\",\"145436358\",\"145436361\",\"145436372\",\"145438507\",\"145438516\",\"145438519\",\"145438525\",\"145561548\",\"145562467\",\"145562477\",\"145593825\",\"145593835\",\"145594176\",\"145729735\",\"145729739\",\"145729785\",\"145732219\",\"145738088\",\"145754165\",\"145892990\",\"145892991\",\"145893148\",\"145893587\",\"145894324\",\"145894325\",\"145894327\",\"145894328\",\"145894329\",\"145894467\",\"145894468\",\"145894469\",\"145895036\",\"145895037\",\"145895038\",\"145895039\",\"145895040\",\"145895041\",\"145895611\",\"145895612\",\"145895613\",\"145895614\",\"145907987\",\"145908041\",\"145913811\",\"145913814\",\"145913815\",\"145913818\",\"145913820\",\"145913824\",\"145913826\",\"145928477\",\"145928490\",\"145928525\",\"145930781\",\"146003116\",\"146003135\",\"146003299\",\"146003320\",\"146008449\",\"146008454\",\"146014576\",\"146039971\",\"146159823\",\"146159825\",\"146159826\",\"146159827\",\"146159832\",\"146160488\",\"146160489\",\"146160491\",\"146160496\",\"146160497\",\"146160866\",\"146161132\",\"146161133\",\"146161135\",\"146161136\",\"146162277\",\"146162307\",\"146163966\",\"146163980\",\"146163991\",\"146165486\",\"146165491\",\"146165744\",\"146165748\",\"146190635\",\"146192773\",\"146192779\",\"146192788\",\"146192793\",\"146192815\",\"146338413\",\"146338414\",\"146338415\",\"146338416\",\"146343665\",\"146343668\",\"146343670\",\"146343671\",\"146343672\",\"146343674\",\"146360317\",\"146360334\",\"146361314\",\"146361321\",\"146466417\",\"146466419\",\"146466429\",\"146466432\",\"146466433\",\"146466434\",\"146466435\",\"146467090\",\"146467094\",\"146467099\",\"146467101\",\"146467118\",\"146467129\",\"146467139\",\"146467141\",\"146467149\",\"146467154\",\"146467161\",\"146467162\",\"146467166\",\"146472674\",\"147035902\",\"147035905\",\"147039516\",\"147040448\",\"147109029\",\"147109030\",\"147109031\",\"147109033\",\"147109040\",\"147109041\",\"147109042\",\"147109043\",\"147110303\",\"147110304\",\"147110307\",\"147110308\",\"147110309\",\"147110311\",\"147110312\",\"147110504\",\"147110505\",\"147111147\",\"147111148\",\"147111149\",\"147111150\",\"147126983\",\"147126985\",\"147126991\",\"147126993\",\"147126994\",\"147128941\",\"147128981\",\"147128993\",\"147142957\",\"147144659\",\"147145321\",\"147145322\",\"147145328\",\"147145331\",\"147145332\",\"147145850\",\"147146314\",\"147146315\",\"147229390\",\"147229391\",\"147229659\",\"147229660\",\"147235365\",\"147235373\",\"147235418\",\"147235435\",\"147240232\",\"147240240\",\"147241842\",\"147241884\",\"147241887\",\"147241897\",\"147241921\",\"147241924\",\"147241925\",\"147241926\",\"147241927\",\"147241928\",\"147256180\",\"147258801\",\"147258806\",\"147258819\",\"147258823\",\"147258830\",\"147258835\",\"147258838\",\"147258842\",\"147258845\",\"147258848\",\"147258854\",\"147258872\",\"147258878\",\"147260698\",\"147260702\",\"147260703\",\"147260735\",\"147260738\",\"147261284\",\"147261285\",\"147261286\",\"147284857\",\"147284858\",\"147284859\",\"147284860\",\"147284864\",\"147286607\",\"147286651\",\"147286658\",\"147286663\",\"147288508\",\"147288509\",\"147288510\",\"147288515\",\"147289887\",\"147289888\",\"147289889\",\"147289891\",\"147289893\",\"147290950\",\"147290951\",\"147290952\",\"147290953\",\"147290954\",\"147290956\",\"147290957\",\"147290966\",\"147291134\",\"147291135\",\"147389516\",\"147389518\",\"148037024\",\"148042126\",\"148042128\",\"148042133\",\"148299023\",\"148299024\",\"148300687\",\"148300694\",\"148300704\",\"148309066\",\"148309565\",\"148309574\",\"148310298\",\"148310310\",\"148310311\",\"148310312\",\"148310313\",\"148310314\",\"148310315\",\"148310316\",\"172497166\",\"172529708\",\"303738891\",\"303738892\",\"314167705\",\"314874905\",\"314874907\",\"317009977\",\"322228334\",\"322265430\",\"322265439\",\"322267407\",\"322293630\",\"322369439\",\"322369447\",\"322459887\",\"322459888\",\"322504974\",\"322504975\",\"322504977\",\"322677168\",\"322677170\",\"322971491\",\"322971494\",\"322971495\",\"322971497\",\"322978025\",\"323041821\",\"323041822\",\"323041823\",\"323041824\",\"323099638\",\"323099688\",\"323155719\",\"323155725\",\"323155726\",\"323155727\",\"323155729\",\"323155731\",\"323163273\",\"323447641\",\"324352985\",\"324352986\",\"324352987\",\"324352988\",\"324352989\",\"324352990\",\"324352991\",\"324352992\",\"324352993\",\"324485087\",\"324485088\",\"324485089\",\"324485090\",\"324485091\",\"324561103\",\"331087395\",\"331087397\",\"331087398\",\"331087399\",\"331087400\",\"331087401\",\"331087405\",\"331087410\",\"331087413\",\"331087416\",\"331087418\",\"331087420\",\"331087425\",\"331087427\",\"331087431\",\"331087432\",\"331087434\",\"331313972\",\"331455965\",\"331523604\",\"331523607\",\"331523611\",\"331547006\",\"331547008\",\"331547016\",\"331547023\",\"331547028\",\"331547032\",\"331547033\",\"331547034\",\"331547036\",\"332972366\",\"333170204\",\"333176396\",\"333267658\",\"333267668\",\"333267686\",\"333283615\",\"657044624\",\"657044625\",\"657044627\",\"657044731\",\"657048595\",\"657048596\",\"664981861\",\"664981862\",\"664981863\",\"664981864\",\"664981865\",\"664981866\",\"664981867\",\"664981868\",\"664981869\",\"664986052\",\"664986057\",\"664986058\",\"664986909\",\"664986910\",\"664986913\",\"664988423\",\"687791524\",\"732012790\",\"732012791\",\"732012792\",\"145895038\",\"10103315\",\"322971497\",\"145907987\",\"322971491\",\"145895038\",\"10103315\",\"322971497\",\"145907987\",\"322971491\",\"314874907\",\"145895038\",\"10103315\",\"322971497\",\"145907987\",\"322971491\",\"314874907\",\"10101780\",\"331547008\",\"323553678\",\"315061563\",\"314874905\",\"322971494\",\"322971494\",\"10101613\",\"314874907\",\"322971494\",\"145895038\",\"10103315\",\"322971497\",\"145907987\",\"322971491\",\"314874907\",\"10101780\",\"331547008\"],\"relation\":[]}")

//overpass.Nodes(data.node, (error, d) => {
	overpass.Ways(data.way.slice(0, 500), (error, d) => {
		overpass.Ways(data.way.slice(500, 1000), (error, d) => {
			overpass.Ways(data.way.slice(1000, 1500), (error, d) => {
				overpass.Ways(data.way.slice(1500, 2000), (error, d) => {
					overpass.Ways(data.way.slice(2000, 2500), (error, d) => {

					})
				})
			})
		})

	})
//})

//overpass.Nodes(['3299494606', '3229765488'], (error, data) => {
//	log(data)
//})

