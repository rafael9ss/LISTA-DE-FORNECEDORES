import { useState, useEffect, useMemo } from "react";
import { Search, MapPin, Phone, Globe, MessageCircle, Instagram, Facebook } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Fornecedor {
  id: string;
  nome: string;
  produtos: string;
  cidade: string;
  estado: string;
  contatos: string[];
}

interface Nicho {
  id: number;
  nome: string;
  descricao: string;
  fornecedores: Fornecedor[];
}

interface ContatoInfo {
  telefone: string;
  telefone_link: string;
  whatsapp: string;
  whatsapp_link: string;
  website: string | null;
  instagram: string | null;
  facebook: string | null;
}

export default function Home() {
  const [nichos, setNichos] = useState<Nicho[]>([]);
  const [contatos, setContatos] = useState<Record<string, ContatoInfo>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNicho, setSelectedNicho] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/fornecedores_completo.json").then((res) => res.json()),
      fetch("/fornecedores_contatos.json").then((res) => res.json()),
    ])
      .then(([nichoData, contatoData]) => {
        setNichos(nichoData.nichos);
        setContatos(contatoData.contatos);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  const getContatoInfo = (nomeEmpresa: string): ContatoInfo | null => {
    const empresa = Object.entries(contatos).find(
      ([key]) => key.toLowerCase() === nomeEmpresa.toLowerCase()
    );
    return empresa ? (empresa[1] as ContatoInfo) : null;
  };

  const filteredNichos = useMemo(() => {
    if (!searchTerm) return nichos;
    
    const term = searchTerm.toLowerCase();
    return nichos
      .map((nicho) => ({
        ...nicho,
        fornecedores: nicho.fornecedores.filter(
          (f) =>
            f.nome.toLowerCase().includes(term) ||
            f.produtos.toLowerCase().includes(term) ||
            f.cidade.toLowerCase().includes(term) ||
            f.estado.toLowerCase().includes(term)
        ),
      }))
      .filter((nicho) => nicho.fornecedores.length > 0);
  }, [searchTerm, nichos]);

  const totalFornecedores = nichos.reduce((sum, n) => sum + n.fornecedores.length, 0);
  const totalNichos = nichos.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Catálogo de Fornecedores</h1>
          <p className="text-blue-100">Brasileiros para E-commerce e Dropshipping</p>
          <div className="mt-4 flex gap-6 text-sm">
            <div>
              <span className="font-semibold text-lg">{totalNichos}</span>
              <p className="text-blue-100">Nichos</p>
            </div>
            <div>
              <span className="font-semibold text-lg">{totalFornecedores}+</span>
              <p className="text-blue-100">Fornecedores</p>
            </div>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Buscar por empresa, produto, cidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-6 text-base border-2 border-blue-200 focus:border-blue-500 rounded-lg"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="0" className="w-full">
          <TabsList className="w-full grid grid-cols-4 lg:grid-cols-6 gap-2 h-auto p-2 bg-white border border-slate-200 rounded-lg overflow-x-auto">
            {filteredNichos.map((nicho) => (
              <TabsTrigger
                key={nicho.id}
                value={nicho.id.toString()}
                className="text-xs sm:text-sm whitespace-nowrap"
              >
                {nicho.nome.split(" ").slice(0, 2).join(" ")} ({nicho.fornecedores.length})
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Content */}
          {filteredNichos.map((nicho) => (
            <TabsContent key={nicho.id} value={nicho.id.toString()} className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">{nicho.nome}</h2>
                <p className="text-slate-600">{nicho.descricao}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nicho.fornecedores.map((fornecedor) => {
                  const contato = getContatoInfo(fornecedor.nome);
                  return (
                    <Card key={fornecedor.id} className="border-2 border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-blue-900">{fornecedor.nome}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          {fornecedor.cidade}, {fornecedor.estado}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                            Produtos
                          </p>
                          <p className="text-sm text-slate-700">{fornecedor.produtos}</p>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex flex-wrap gap-2">
                          {contato?.website && (
                            <a
                              href={contato.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visitar website"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-blue-50 hover:border-blue-400"
                              >
                                <Globe className="w-3 h-3 mr-1" />
                                Website
                              </Button>
                            </a>
                          )}
                          {contato?.telefone_link && (
                            <a href={contato.telefone_link} title={`Ligar para ${contato.telefone}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-blue-50 hover:border-blue-400"
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                {contato.telefone}
                              </Button>
                            </a>
                          )}
                          {contato?.whatsapp_link && (
                            <a
                              href={contato.whatsapp_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Enviar mensagem WhatsApp"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-green-50 hover:border-green-400"
                              >
                                <MessageCircle className="w-3 h-3 mr-1" />
                                WhatsApp
                              </Button>
                            </a>
                          )}
                          {contato?.instagram && (
                            <a
                              href={contato.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Seguir no Instagram"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-pink-50 hover:border-pink-400"
                              >
                                <Instagram className="w-3 h-3 mr-1" />
                                IG
                              </Button>
                            </a>
                          )}
                          {contato?.facebook && (
                            <a
                              href={contato.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Seguir no Facebook"
                            >
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs hover:bg-blue-50 hover:border-blue-400"
                              >
                                <Facebook className="w-3 h-3 mr-1" />
                                FB
                              </Button>
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredNichos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">Nenhum fornecedor encontrado para "{searchTerm}"</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Catálogo de Fornecedores Brasileiros. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
